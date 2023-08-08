import mongoose, { InferSchemaType } from "mongoose";
const { Schema, model, models } = mongoose;

const inscriptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        amount_paid: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "approved"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

type IInscription = InferSchemaType<typeof inscriptionSchema>;

const Inscription = models?.Inscription || model<IInscription>("Inscription", inscriptionSchema);

export default Inscription;
