// src/infrastructure/mappers/user.mapper.ts
import { Gym } from '../../domain/entities/Gym';
import { Gym as PrismaGym, User as PrismaUser, Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GymMapper {
  public static toDomain(prismaGym: PrismaGym & { members?: PrismaUser[] }): Gym {
    return new Gym({
      id: prismaGym.id,
      name: prismaGym.name,
      address: prismaGym.address,
      members: [],
      createdAt: prismaGym.created_at,
      updatedAt: prismaGym.updated_at,
    });
  }

  public static toDatabase(gym: Gym): Prisma.GymCreateInput {
    return {
      id: gym.id || undefined,
      name: gym.name,
      address: gym.address,
      created_at: gym.createdAt || new Date(),
      updated_at: gym.updatedAt || new Date(),
    };
  }
}
