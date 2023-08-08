import mongoose, { InferSchemaType } from "mongoose";
const { Schema, model, models } = mongoose;

const courseSchema = new Schema(
    {
        title: {
            type: String,
            unique: [true, "Title already exists!"],
            required: [true, "Title is required!"],
        },
        description: {
            type: String,
            required: [true, "Description is required!"],
        },
        livePrice: {
            type: Number,
            default: 0,
        },
        onDemandPrice: {
            type: Number,
            required: [true, "Price is required!"],
        },
        image: {
            type: String,
            required: [true, "Image is required!"],
        },
        tags: [
            {
                type: String,
                default: null,
            },
        ],
        onSale: {
            type: Number,
            default: 0,
        },
        isLive: {
            type: Boolean,
            default: true,
        },
        isOnDemand: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        duration: {
            // number of classes
            type: Number,
            default: null,
        },
        professor: {
            type: String,
            default: null,
        },
        liveDate: {
            type: Date,
        },
        driveUrl: {
            type: String,
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

type ICourse = InferSchemaType<typeof courseSchema>;

const Course = models?.Course || model<ICourse>("Course", courseSchema);

export default Course;
