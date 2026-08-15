import { User } from "../models/user.model";

export interface CreateUserDTO {
    name: string,
    email: string,
    password: string
}

export type UpdateUserDTO = Partial<CreateUserDTO>;

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export function toUserResponse(user: User): UserResponseDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}