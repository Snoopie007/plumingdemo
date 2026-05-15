import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
        return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    try {
        const data = await api.get(`web/schedules?date=${date}`);
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}