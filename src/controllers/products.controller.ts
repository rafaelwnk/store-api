import type { Request, Response } from 'express';
import type { CreateProductDTO, UpdateProductDTO } from "../dtos/product.dto";
import { productRepository } from "../repositories/products.repository"

export const get = async (req: Request, res: Response) => {
    const products = await productRepository.findAll();
    return res.status(200).json(products);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const product = await productRepository.findById(id);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    return res.status(200).json(product);
}

export const getBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;

    if (typeof slug !== 'string') return res.status(400).json({ error: 'Slug inválido' });

    const product = await productRepository.findBySlug(slug);

    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    return res.status(200).json(product);
}

export const getByTag = async (req: Request, res: Response) => {
    const { tag } = req.params;

    if (typeof tag !== 'string') return res.status(400).json({ error: 'Tag inválida' });

    const products = await productRepository.findByTag(tag);

    return res.status(200).json(products);
}

export const create = async (req: Request, res: Response) => {
    const data: CreateProductDTO = req.body;
    const newProduct = await productRepository.create(data);
    return res.status(201).json(newProduct);
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const data: UpdateProductDTO = req.body;

    const updatedProduct = await productRepository.update(id, data);

    if (!updatedProduct) return res.status(404).json({ error: 'Produto não encontrado' });

    return res.status(200).json(updatedProduct);
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (typeof id !== 'string') return res.status(400).json({ error: 'ID inválido' });

    const deleted = await productRepository.delete(id);

    if (!deleted) {
        return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(204).send();
}