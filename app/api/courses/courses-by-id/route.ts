import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/database/database";
import Course from "@/database/models/course";

export async function GET(req: NextRequest) {
    // esta ruta no me gusta, me imagino que deberia haber una carpeta [id] o algo por el estilo
    // tengo que averiguar como obtener el parametro "id" en la ruta si es con esa carpeta
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectToDB();
        const courseFound = await Course.findById(id);
        if (!courseFound) {
            return NextResponse.json({ message: "Course not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Success", data: courseFound }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { status: 400 });
    }
}
