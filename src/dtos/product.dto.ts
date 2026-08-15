export interface CreateProductDTO {
    title: string;
    slug: string;
    description: string;
    price: Number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;