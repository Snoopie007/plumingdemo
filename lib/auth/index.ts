
import bcrypt from "bcryptjs";
import { customSession, multiSession } from "better-auth/plugins";
import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { toNextJsHandler } from "better-auth/next-js";
import { SignJWT } from "jose";
import { generateAppleClientSecret } from "./apple";
import { eq } from "drizzle-orm";
import { getOAuthState } from "better-auth/api";
// Generate Apple secret at startup (will be refreshed on each deploy/restart)
const appleClientSecret = await generateAppleClientSecret();

const isProduction = process.env.NODE_ENV === "production";
const isPreview = process.env.VERCEL_ENV === "preview";
// Get baseURL with fallback
const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// Use secure cookies if we're on HTTPS (production, preview, or ngrok)
const useSecureCookies = isProduction || isPreview || baseURL.startsWith("https://");


async function apiTokenGenerator(payload: {
	userId: string;
	email: string;
	memberId: string;
}): Promise<string> {
	const { userId, email, memberId } = payload;
	// Generate Supabase-compatible JWT
	const supabaseSecret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET);
	const now = Math.floor(Date.now() / 1000);

	const supabasePayload = {
		aud: "authenticated",
		exp: now + 24 * 60 * 60, // 24 hours
		iat: now,
		sub: userId,
		role: "authenticated",
		email: email || "",
		user_metadata: {
			member_id: memberId,
			role: "member",
		},
	};

	const token = await new SignJWT(supabasePayload).setProtectedHeader({ alg: "HS256", typ: "JWT" }).sign(supabaseSecret);
	return token;
}

export const auth = betterAuth({
	baseURL,
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	account: {
		fields: {
			providerId: "provider",
			createdAt: 'created',
			updatedAt: 'updated',
		},
	},
	user: {
		fields: {
			createdAt: 'created',
			updatedAt: 'updated',
		},
		additionalFields: {
			username: {
				type: "string",
				required: true,
			},
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
			mapProfileToUser: (profile) => {
				return {
					username: generateUsername(profile.name),
				};
			},
		},
		apple: {
			clientId: process.env.AUTH_APPLE_ID!,
			clientSecret: appleClientSecret, // Use dynamically generated secret
			scope: ["name", "email"],
			mapProfileToUser: (profile) => {
				const name = profile.name || Math.random().toString(36).substring(2, 8);
				return {
					username: generateUsername(name),
				};
			},
		},
	},

	databaseHooks: {
		user: {
			create: {
				before: async (user, ctx) => {
					if (!ctx || !ctx.path || ctx.path !== "/callback/:id") {
						return { data: user };
					}
					// Get additional data from OAuth state
					const oauthState = await getOAuthState();
					if (!oauthState?.memberId) {
						return { data: user }; // No userId passed, proceed with normal creation
					}

					const targetMemberId = oauthState.memberId;


					// Check if the existing member exists
					const existingMember = await db.query.members.findFirst({
						where: (members, { eq }) => eq(members.id, targetMemberId),
						columns: {
							id: true,
							userId: true,
						}
					});
					if (!existingMember) {
						return { data: user };
					}


					// CRITICAL: Return `false` to prevent the new user from being created
					// Then manually create the account linked to the existing user
					const accountData = {
						userId: existingMember.userId,
						providerId: ctx.body?.provider,
						// These come from the OAuth profile - access via ctx or internal state
						accountId: ctx.body?.accountId || ctx.context.oauthProfile?.sub,
						accessToken: ctx.body?.accessToken,
						refreshToken: ctx.body?.refreshToken,
						// ... other account fields
					};
					// Create the account for the existing user
					await ctx.context.internalAdapter.createAccount(accountData);
					// Option 2: Return the existing user data 
					// (if Better Auth uses this for session creation)
					return { data: user };
				},
				after: async (user, ctx) => {
					try {

						const nameParts = (user.name || "").split(" ");
						const firstName = nameParts[0] || "Unknown";
						const lastName = nameParts.slice(1).join(" ") || "";

						const [member] = await db.insert(members).values({
							userId: user.id,
							firstName,
							lastName,
							email: user.email,
							phone: "",  // Required - filled during setup
							setupCompleted: false,
						}).onConflictDoUpdate({
							target: [members.userId],
							set: {
								userId: user.id,
								email: user.email,
							},
						}).returning({
							id: members.id,
						});
						if (ctx && ctx.path === "/callback/:id") {
							const additionalData = await getOAuthState();
							if (additionalData?.migrateId) {
								// Handle migration logic
								await db.update(migrateMembers).set({
									memberId: member.id,
									viewedOn: new Date(),
								}).where(eq(migrateMembers.id, additionalData.migrateId));
							}
						}


					} catch (error) {
						console.error(error);
						await db.delete(users).where(eq(users.id, user.id));
					}
				},
			},
		},
	},

	plugins: [
		multiSession(),
		customSession(async ({ user, session }) => {

			const userData = await db.query.users.findFirst({
				where: (users, { eq }) => eq(users.id, user.id),
				with: {
					member: {
						columns: {
							id: true,
							firstName: true,
							lastName: true,
							email: true,
							phone: true,
							setupCompleted: true,
						},
					},
				},
			});


			if (!userData) {
				throw new APIError("BAD_REQUEST", {
					message: "User not found",
				});
			}

			const { member, ...rest } = userData;
			if (!member) {
				throw new APIError("BAD_REQUEST", {
					message: "User not found",
				});
			}


			const apiToken = await apiTokenGenerator({
				userId: rest.id,
				email: member?.email,
				memberId: member?.id
			});

			return {
				session: {
					...session,
				},
				user: {
					...rest,
					memberId: member?.id,
					email: member?.email,
					firstName: member?.firstName,
					lastName: member?.lastName,
					phone: member?.phone,
					role: "member",
					apiToken: apiToken,
					setupCompleted: member?.setupCompleted,
				},
			};
		}),
	],


	emailAndPassword: {
		enabled: true,

		password: {
			hash: async (password: string) => {
				return bcrypt.hash(password, 10);
			},
			verify: async ({ hash, password }: { hash: string; password: string }) => {

				return bcrypt.compare(password, hash);
			},
		},
	},

	session: {
		expiresIn: 60 * 60 * 24 * 365, // 1 year
		updateAge: 60 * 60, // Update every hour
	},

	advanced: {
		useSecureCookies,
		cookiePrefix: "monstro",
		database: {
			generateId: false, // "serial" for auto-incrementing numeric IDs
		},
		crossSubDomainCookies: isProduction || isPreview
			? {
				enabled: true,
				domain: isProduction ? ".monstro-x.com" : ".monstrox.vercel.app",
			}
			: undefined,
	},


	trustedOrigins: [
		baseURL,
		"https://monstro-x.com",
		"https://www.monstro-x.com",
		"https://member.monstro-x.com",
		"https://m.monstro-x.com",
		"https://appleid.apple.com",
		"https://www.googleapis.com/oauth2/v3/certs",
		isPreview && "https://monstrox.vercel.app",
	].filter(Boolean) as string[],

	hooks: {
		// 	before: createAuthMiddleware(async (ctx) => {

		// 		if (ctx.path === "/sign-in/email") {
		// 			const { email, password } = ctx.body;

		// 			// Check if credential account exists
		// 			const account = await db.query.accounts.findFirst({
		// 				where: (account, { eq, and }) =>
		// 					and(eq(account.accountId, email), eq(account.provider, "credential")),
		// 				with: {
		// 					user: true,
		// 				},
		// 				columns: {
		// 					password: true,
		// 				},
		// 			});

		// 			// If account exists, verify password
		// 			if (account && account.password) {
		// 				const match = await bcrypt.compare(password, account.password);

		// 				if (!match) {
		// 					throw new APIError("BAD_REQUEST", {
		// 						message: "Invalid password or email",
		// 					});
		// 				}
		// 				// Password matches, let better-auth continue
		// 				return ctx;
		// 			}

		// 			// Account doesn't exist - let better-auth handle the error
		// 			return ctx;
		// 		}

		// 		return ctx;

		// 	})
	}
});

export const { GET, POST } = toNextJsHandler(auth);
