import { Product } from '../../domain/entities/Product';

export interface ProductDTO {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  categoryId: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export const ProductMapper = {
  toDTO(product: Product): ProductDTO {
    return {
      id: product.id || '', // Ensure id is always defined
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
      categoryId: product.categoryId,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString()
    };
  }
};