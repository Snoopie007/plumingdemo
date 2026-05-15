import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const lid = process.env.LOCATION_ID;
    try {

        const res = await api.get(`public/loc/${lid}/gateway`);


        return NextResponse.json(res);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}