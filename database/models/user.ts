import mongoose, { InferSchemaType } from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required!"],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
        },
        password: {
            type: String,
            default: null,
            minLength: 8,
        },
        firstName: {
            type: String,
            default: "Alumno",
        },
        lastName: {
            type: String,
            default: null,
        },
        phoneNumber: {
            type: String,
            default: null,
        },
        id_document: {
            type: Number,
            default: null,
        },
        address: {
            type: String,
            default: null,
        },
        image: {
            type: String,
            default: "https://iili.io/H4uyVZF.webp",
        },
        role: {
            type: String,
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        reffersCodes: {
            type: [String],
            default: null,
        },
        inscriptions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Inscription",
            },
        ],
    },
    {
        versionKey: false,
    }
);

type IUser = InferSchemaType<typeof userSchema>;

const User = models?.User || model<IUser>("User", userSchema);

export default User;
