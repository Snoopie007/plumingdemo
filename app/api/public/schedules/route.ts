import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const lid = process.env.LOCATION_ID;
    const PUBLIC_API_BASE_URL = `${process.env.MONSTRO_API}/public`;

    const date = req.nextUrl.searchParams.get("date");
    if (!date) {
        return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }
    try {
        const res = await fetch(`${PUBLIC_API_BASE_URL}/loc/${lid}/schedules?date=${date}`);
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}