import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use globalThis to keep a single instance across the application
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// In development, reset the client on Hot Reload
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
} 

export type PrismaFilter =
  | { in: number[] | string[] }
  | { equals: string | number }
  | { gte: number }
  | { lte: number }
  | { contains: string }
  | { flag: boolean };
