import { NextFunction, Request, Response } from 'express';
import { ProductFetchOptions, ProductRepository } from '../../domain/repositories/product-repository';
import { ProductMapper } from '../../application/dtos/product-dto';

export class ProductController {
  constructor(
    private productRepository: ProductRepository,
  ) {}

  getProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fos = new ProductFetchOptions();
      const products = await this.productRepository.fetch(fos);
      const productsDTO = products.map(ProductMapper.toDTO);
      res.status(200).json(productsDTO);
    } catch (error) {
      next(error);
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error @getProducts' });
    }
  };

  fetchProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const fos = new ProductFetchOptions();
      const offset = req.query.offset || '0';
      const limit = req.query.limit || '10';

      // Parse query parameters
      if (req.query.categoryName) {
        fos.categoryNames = [req.query.categoryName as string];
      }

      if (req.query.includeInactive) {
        fos.includeInactive = req.query.includeInactive === 'true';
      }
      
      if (req.query.limit) {
        fos.limit = parseInt(limit as string);
      }
      
      if (req.query.offset) {
        fos.offset = parseInt(offset as string);
      }

      if (req.query.maxPrice) {
        fos.maxPrice = parseFloat(req.query.maxPrice as string);
      }
      
      const products = await this.productRepository.fetch(fos);
      
      const productsDTO = products.map(ProductMapper.toDTO);
      res.status(200).json(productsDTO);
    } catch (error) {
      next(error);
      console.error('Error fetching products with options:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
} 