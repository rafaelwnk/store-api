import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { User, UserModel } from "../models/user.model"

export const userRepository = {
    findAll: async (): Promise<User[]> => {
        return await UserModel.find();
    },

    findById: async (id: string): Promise<User | null> => {
        return await UserModel.findById(id);
    },

    findByEmail: async (email: string): Promise<User | null> => {
        return await UserModel.findOne({ email: email });
    },

    create: async (data: CreateUserDTO): Promise<User> => {
        const newUser = new UserModel(data);
        return await newUser.save();
    },

    update: async (id: string, data: UpdateUserDTO): Promise<User | null> => {
        return await UserModel.findByIdAndUpdate(id, data, { new: true })
    },

    delete: async (id: string): Promise<boolean> => {
        return await UserModel.findByIdAndDelete(id) !== null;
    }
}