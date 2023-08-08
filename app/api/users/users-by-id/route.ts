import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/database/database";
import User from "@/database/models/user";

export async function GET(req: NextRequest) {
    // esta ruta no me gusta, me imagino que deberia haber una carpeta [id] o algo por el estilo
    // tengo que averiguar como obtener el parametro "id" en la ruta si es con esa carpeta
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectToDB();
        const userFound = await User.findById(id);
        if (!userFound) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Success", data: userFound }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { status: 400 });
    }
}
