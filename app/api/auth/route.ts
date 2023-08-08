import User from "@/database/models/user";
import { connectToDB } from "@/database/database";
import { NextResponse } from "next/server";
import { compare } from "bcrypt-ts";

// create user
export async function POST(req: Request) {
    try {
        await connectToDB();

        const body = await req.json();

        // check if a user already exists
        const userFound = await User.findOne({ email: body.email });

        if (!userFound) {
            return NextResponse.json(
                { message: "Incorrect user or password", error: "User not found" },
                { status: 200 }
            );
        }

        // check if password match
        const passwordCheck = await comparePassword(body.password, userFound.password);

        if (!passwordCheck) {
            return NextResponse.json(
                { message: "Incorrect user or password", error: "Incorrect password" },
                { status: 200 }
            );
        }

        return NextResponse.json({ message: "Success", data: userFound }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "An error ocurred", error: error }, { status: 400 });
    }
}

const comparePassword = async (password: string, receivedPassword: string) => {
    return await compare(password, receivedPassword); // compara los dos passwords encriptados y devuelve un booleano
};
