// src/infrastructure/mappers/user.mapper.ts
import { Gym } from '../../domain/entities/Gym';
import { Gym as PrismaGym, User as PrismaUser, Prisma } from '@prisma/client';
import { UserMapper } from './user-mappers';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GymMapper {
  public static toDomain(prismaGym: PrismaGym & { members?: PrismaUser[] }): Gym {
    return new Gym({
      id: prismaGym.id,
      name: prismaGym.name,
      address: prismaGym.address,
      members: prismaGym.members ? prismaGym.members.map(member => UserMapper.toDomain(member)) : [],
      createdAt: prismaGym.created_at,
      updatedAt: prismaGym.updated_at,
    });
  }

  // Convert Domain User to Prisma User
  public static toDatabase(gym: Gym): Prisma.GymCreateInput {
    return {
      id: gym.id || undefined, // If empty string, let Prisma generate the id
      name: gym.name,
      address: gym.address,
      // Relations are handled separately in repository methods
      // e.g., connect members via prisma.gym.update()
      created_at: gym.createdAt || new Date(),
      updated_at: gym.updatedAt || new Date(),
    };
  }
}
