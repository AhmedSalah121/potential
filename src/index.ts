import express, { Request, Response } from 'express';
import { ProductController } from './interfaces/controllers/product-controller';
import { ProductRepository } from './domain/repositories/product-repository';
import { ProductRepositoryImpl } from './infrastructure/repositories/product-repository-impl';
import { PrismaClient } from '@prisma/client';
import ProductRouter from './interfaces/routes/product-router';
import { UserRepository } from './domain/repositories/user-repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user-repository-impl';
import UserController from './interfaces/controllers/user-controller';
import UserRouter from './interfaces/routes/user-router';
import SupabaseAuth from './application/middlewares/supabase-auth';
import GymRouter from './interfaces/routes/gym-router';
import { GymRepository } from './domain/repositories/gyp-repository';
import { GymRepositoryImpl } from './infrastructure/repositories/gym-repository-impl';
import GymController from './interfaces/controllers/gym-controller';
import RoleAuth from './application/middlewares/role-auth';

const db = new PrismaClient();

const productRepository: ProductRepository = new ProductRepositoryImpl(db);
const productController = new ProductController(productRepository);

const userRepository: UserRepository = new UserRepositoryImpl(db);
const userController = new UserController(userRepository);
const supabaseAuth = new SupabaseAuth();
const roleAuth = new RoleAuth(userRepository);

const gymRepository: GymRepository = new GymRepositoryImpl(db);
const gymController = new GymController(gymRepository, userRepository);

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

const productRouter = new ProductRouter(productController);
const userRouter = new UserRouter(userController, supabaseAuth);
const gymRouter = new GymRouter(gymController, supabaseAuth, roleAuth);

app.use('/api/v1/products', productRouter.getRouter());
app.use('/api/v1/users', userRouter.getRouter());
app.use('/api/v1/gyms', gymRouter.getRouter());

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});

export default app;
