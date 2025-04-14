import express, { Request, Response } from 'express';
import { ProductController } from './interfaces/controllers/product-controller';
import { ProductRepository } from './domain/repositories/product-repository';
import { ProductRepositoryImpl } from './infrastructure/repositories/product-repository-impl';
import { PrismaClient } from '@prisma/client';
import ProductRouter from './interfaces/routes/product-router';

const db = new PrismaClient();
const productRepository: ProductRepository = new ProductRepositoryImpl(db);
const productController = new ProductController(productRepository);

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Store API is running! 🚀' });
});

app.use('/api/v1/products', new ProductRouter(productController).getRouter());

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
