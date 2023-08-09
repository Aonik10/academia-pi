import * as inscriptionController from "@/database/controllers/inscription.controller";
import { connectToDB } from "@/database/database";
import { InscriptionCreate } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { user_id, course_id, amount_paid, status } = (await req.json()) as InscriptionCreate;
        const inscription = inscriptionController.create(user_id, course_id, Number(amount_paid), status);
        return NextResponse.json({ message: "Inscription created", data: inscription }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { status: 400 });
    }
}
