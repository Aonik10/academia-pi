import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";
import fs from "fs";

import { __dirname } from "@/utils/utils";

class ImageStoreError extends Error {
    constructor() {
        super("Attempt to store the image has failed");
    }
}

class ImageNotFoundError extends Error {
    constructor() {
        super("Image not found");
    }
}

export async function GET(req: NextRequest) {
    // https://github.com/vercel/next.js/discussions/15453#discussioncomment-6226391

    try {
        const imageName = req.nextUrl.searchParams.get("imageName");
        const filePath = __dirname + "/database/images/" + imageName;
        if (!fs.existsSync(filePath)) {
            throw new ImageNotFoundError();
        }
        const imageBuffer = fs.readFileSync(filePath);
        const res = new NextResponse(imageBuffer);
        //res.headers.set("Content-Type", "image/jpg"); this was not necessary
        return res;
    } catch (error: any) {
        if (error instanceof ImageNotFoundError) {
            return NextResponse.json(
                { message: error.message },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    // useful links (maybe?)
    // https://github.com/vercel/next.js/issues/48875
    // https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/

    try {
        const formData = await req.formData();
        const image_name = await storeImage(formData);

        if (!image_name) throw new ImageStoreError();

        return NextResponse.json({
            message: "Image uploaded successfully",
            url: image_name,
        });
    } catch (error: any) {
        if (error instanceof ImageStoreError) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Something went wrong", error: error.message },
            { status: 500 }
        );
    }
}

async function storeImage(formData: FormData) {
    // get the file saved into "image" key
    const file = formData.get("image") as File;

    // convert the file into a buffer instance
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // define a unique filename and store the image
    const folderName = __dirname + "/database/images/";
    const imageName = v4() + "-" + file.name;
    const path = folderName + imageName;
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    fs.writeFileSync(path, buffer);

    // returns the image_name
    return imageName;
}
