import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    }, 
    userId: {
        type: String,
        required: true
    }
});

export const User = mongoose.model("User", userSchema)