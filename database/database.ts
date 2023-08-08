import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        if (!process.env.MONGO_DB_URI) {
            return;
        }
        await mongoose.connect(process.env.MONGO_DB_URI, {
            dbName: "academia_pi_dev",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);

        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};
