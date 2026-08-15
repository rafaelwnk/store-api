import { Document, model, Schema } from "mongoose";

export interface User extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})


export const UserModel = model<User>('User', userSchema);