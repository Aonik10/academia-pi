import { NextRequest, NextResponse } from "next/server";

import User from "@/database/models/user";
import { connectToDB } from "@/database/database";
import { genSalt, hash } from "bcrypt-ts";
import { UserCreated, UserUpdate } from "@/utils/interfaces";

export async function GET(req: NextRequest) {
    try {
        connectToDB();
        const stringFilter = req.nextUrl.searchParams.get("stringFilter");

        const re = new RegExp(`${stringFilter}`, "i");

        let users = (await User.find({
            $or: [
                { email: { $regex: re } },
                { firstName: { $regex: re } },
                { lastName: { $regex: re } },
                { phoneNumber: { $regex: re } },
                //{ id_document: { $regex: re } }
            ],
        })) as UserCreated[];

        return NextResponse.json({ message: "Success", data: users }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "Something went wrong", error: error.message });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        const { email, password, firstName, lastName } = await req.json();

        // check if a user already exists
        const userFound = await User.findOne({ email });

        // if not, create a new user and save it
        if (!userFound) {
            const newUser = await createUser({ email, password, firstName, lastName });
            return NextResponse.json({ message: "User created", data: newUser }, { status: 200 });
        }

        return NextResponse.json({ message: "User already exists in db", data: userFound }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error ocurred", error: error }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        connectToDB();
        const body = (await req.json()) as UserUpdate;
        const id = req.nextUrl.searchParams.get("id");

        // find user
        const userFound = await User.findByIdAndUpdate(id, body, { new: true });
        if (!userFound) return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json(
            {
                message: "User updated successfully",
                data: userFound,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "An error ocurred",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        connectToDB();
        const id = req.nextUrl.searchParams.get("id");
        const userDeleted = await User.findByIdAndDelete(id);

        if (!userDeleted) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully", data: userDeleted }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: "An error ocurred", error: error.message }, { status: 400 });
    }
}

const encryptPassword = async (password: string): Promise<string> => {
    const salt = await genSalt();
    return await hash(password, salt);
};

interface NewUser {
    email: string;
    password: string | null;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    role?: string | null;
}

export const createUser = async ({ email, password, image, firstName, lastName, role }: NewUser) => {
    const newUser = await User.create({
        email: email.toLowerCase(),
        password: password ? await encryptPassword(password) : null,
        firstName: firstName ?? "Alumno",
        lastName: lastName ?? "",
        image: image ?? "https://iili.io/H4uyVZF.webp",
        role: role ?? "user",
    });
    return newUser;
};
