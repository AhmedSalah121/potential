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


function toMB(bytes: number): number {
  return parseFloat((bytes / (1024 * 1024)).toFixed(2));
}

const memory = process.memoryUsage();

const memoryMB = Object.fromEntries(
  Object.entries(memory).map(([k, v]) => [k, toMB(v)])
);

// Routes
app.get('/', async (_: Request, res: Response) => {
  try {
    const serverInfo = {
      status: 'running 🚀',
      time: new Date().toISOString(),
      uptime: (process.uptime() / 3600).toFixed(2) + ' hours',
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: memoryMB,
      memoryUnit: 'MB'
    };
    
    const deploymentInfo = {
      vercel: {
        region: process.env.VERCEL_REGION || 'local',
        environment: process.env.VERCEL_ENV || 'development',
        gitBranch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown',
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
      },
      buildTime: process.env.BUILD_TIME || new Date().toISOString(),
    };

    res.json({
      message: "Store API",
      server: serverInfo,
      deployment: deploymentInfo,
    });

  } catch (error) {
    console.error('Root endpoint error:', error);
    res.status(500).json({ 
      error: 'Diagnostics failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

app.use('/api/v1/products', new ProductRouter(productController).getRouter());

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
