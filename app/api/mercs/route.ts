import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const lid = process.env.LOCATION_ID;
    const API_KEY = process.env.API_KEY;



    const filters = req.nextUrl.searchParams.get("filters");
    try {
        const data = await api.get(`web/mercs`);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}