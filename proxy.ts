
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {


    return NextResponse.next();
}

/**
 * Run on non-asset routes so `?session_token=` can be handled on any page (e.g. auth callback).
 * CSRF is still only enforced for POST /api/public inside `proxy`.
 */
export const proxyConfig = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
