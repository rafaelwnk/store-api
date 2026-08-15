import type { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { userRepository } from "../repositories/user.repository";
import { CreateUserDTO, toUserResponse, UpdateUserDTO } from '../dtos/user.dto';
import { env } from '../config/env';

export const get = async (req: Request, res: Response) => {
    const users = await userRepository.findAll();
    return res.status(200).json(users.map(u => {
        return toUserResponse(u)
    }));
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const user = await userRepository.findById(id);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json(toUserResponse(user));
}

export const create = async (req: Request, res: Response) => {
    const data: CreateUserDTO = req.body;
    data.password = await hash(data.password, 10);
    const newUser = await userRepository.create(data);
    return res.status(201).json(toUserResponse(newUser));
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const data: UpdateUserDTO = req.body;

    const updatedUser = await userRepository.update(id, data);

    if (!updatedUser) return res.status(404).json({ error: 'Usuário não encontrado' });

    return res.status(200).json(toUserResponse(updatedUser));
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const deleted = await userRepository.delete(id);

    if (!deleted) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(204).send();
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userRepository.findByEmail(email);

    if (!user) return res.status(404).json({ error: 'Credenciais inválidas' });

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) return res.status(404).json({ error: 'Credenciais inválidas' });

    const token = sign(
        { id: user._id, email: user.email },
        env.jwtKey,
        { expiresIn: '1h' }
    )

    res.status(200).json(token);
}