import {Mongoose} from "mongoose";

export const mongoose = new Mongoose();

try {
    mongoose.connect("mongodb://localhost:27017/usersdb")
        .then(() => console.log("Connection to database established."));
} catch (error) {
    console.error(error);
    process.exit(1);
}

