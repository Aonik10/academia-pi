import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json({ message: "Pending" });
    } catch (error: any) {
        return NextResponse.json({ message: "Pending with error" });
    }
}
