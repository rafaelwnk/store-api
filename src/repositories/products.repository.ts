import type { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import { Product, ProductModel } from "../models/product.model";

export const productRepository = {
    findAll: async (): Promise<Product[]> => {
        return await ProductModel.find();
    },

    findById: async (id: string): Promise<Product | null> => {
        return await ProductModel.findById(id);
    },

    findBySlug: async (slug: string): Promise<Product | null> => {
        return await ProductModel.findOne({ slug: slug });
    },

    findByTag: async (tag: string): Promise<Product[]> => {
        return await ProductModel.find({ tags: tag });
    },

    create: async (data: CreateProductDTO): Promise<Product> => {
        const newProduct = new ProductModel(data);
        return await newProduct.save();
    },

    update: async (id: string, data: UpdateProductDTO): Promise<Product | null> => {
        return await ProductModel.findByIdAndUpdate(id, data, { new: true });
    },

    delete: async (id: string): Promise<boolean> => {
        return await ProductModel.findByIdAndDelete(id) !== null;
    }
}