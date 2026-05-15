import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const lid = process.env.LOCATION_ID;
    const code = req.nextUrl.searchParams.get("code");
    try {
        const data = await api.get(`public/loc/${lid}/promos/${code}`);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}