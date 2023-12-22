import mongoose from "mongoose";
import config from "config";

async function dbConnect() {
    try {
        await mongoose.connect(config.get("DB_URI"));
        console.log("DB Connected Sucessfully!");
    } catch (error) {
        console.error(error);
    }
}

dbConnect();
