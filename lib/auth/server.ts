'use server';
import { auth as betterAuth } from "@/libs/auth";
import { headers } from "next/headers";

/**
 * Server-side auth helper - matches Next-Auth's auth() API
 */
export async function auth() {
	const headersList = await headers();

	const result = await betterAuth.api.getSession({
		headers: headersList,
	});
	return result;
}
