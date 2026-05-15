import { api } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookie = request.headers.get("cookie");
    if (!cookie) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    try {
        const date = await api.post("web/orders", body, {
            headers: {
                "Cookie": cookie
            }
        });
        return NextResponse.json({ message: "Order created" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}