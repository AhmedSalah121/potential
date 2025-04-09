import { Product as PrismaProduct } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { PrismaFilter } from '../database/prisma-client';
import { Product } from '../../domain/entities/Product';
import { ProductRepository, ProductFetchOptions } from '../../domain/repositories/product-repository';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductRepositoryI implements ProductRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private toDomainEntity(prismaProduct: PrismaProduct): Product {
    return new Product({
      id: prismaProduct.id,
      name: prismaProduct.name,
      price: Number(prismaProduct.price),
      categoryId: prismaProduct.categoryId,
      description: prismaProduct.description,
      stock: prismaProduct.stock,
      imageUrl: prismaProduct.imageUrl,
      isActive: prismaProduct.isActive,
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt
    });
  }

  private toPrismaEntity(product: Product): Omit<PrismaProduct, 'createdAt' | 'updatedAt'> {
    return {
      id: product.id || crypto.randomUUID(), // Ensure id is always defined
      name: product.name,
      description: product.description,
      price: Decimal(product.price),
      stock: product.stock,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
      categoryId: product.categoryId,
    };
  }

  async fetch(options: ProductFetchOptions): Promise<Product[]> {
    const { ids, includeInactive = false, limit, offset, maxPrice } = options;
    const where: Record<string, PrismaFilter> = {};

    if (ids) {
      where.id = { in: ids };
    }

    // if (categoryNames) {
    //   where.category = { name: { in: categoryNames }};
    // }
    
    if (!includeInactive) {
      where.isActive = { flag: true };
    }

    if (maxPrice) {
      where.price = { lte: maxPrice };
    }

    const result = await this.prisma.product.findMany({ 
      where,       
      take: limit,
      skip: offset,
    });

    return result.map(product => this.toDomainEntity(product));
  }

  async save(product: Product): Promise<Product[]> {
    const data = this.toPrismaEntity(product);
    
    const saved = await this.prisma.product.upsert({
      where: { id: product.id || '' },
      update: data,
      create: data
    });
    
    return [this.toDomainEntity(saved)];
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id }
    });
  }
}
