import { Schema, model, Document } from 'mongoose';

export interface Product extends Document {
    title: string;
    slug: string;
    description: string;
    price: Number;
    active: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<Product>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export const ProductModel = model<Product>('Product', productSchema);