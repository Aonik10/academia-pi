import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json({ message: "Failure" });
    } catch (error: any) {
        return NextResponse.json({ message: "Failure with error" });
    }
}
