import { GymRepository, GymFetchOptions } from '../../domain/repositories/gyp-repository';
import { PrismaClient } from '@prisma/client';
import { PrismaFilter } from '../database/prisma-client';
import * as domain from "../../domain/entities/Gym";
import { GymMapper } from '../mappers/gym-mapper';

export class GymRepositoryImpl implements GymRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async fetch(fetchOptions: GymFetchOptions): Promise<domain.Gym[]> {
    const where: Record<string, PrismaFilter> = {};
    const {name, address, ids} = fetchOptions;

    if (ids) {
      where.id = {in: ids};
    }

    if (name) {
      where.name = {in: [name]};
    }
    
    if (address) {
      where.address = {in: [address]};
    }

    const gyms = await this.prisma.gym.findMany({where});
    const gymsDomain = [];

    for (const gym of gyms) {
      gymsDomain.push(GymMapper.toDomain(gym));
    }

    return Promise.resolve(gymsDomain);
  }

  async save(gyms: domain.Gym[]): Promise<domain.Gym[]> {
    const saved = await Promise.all(
      gyms.map((gym)=> {
        return this.prisma.gym.upsert({
          where: {id: gym.id ?? ''},
          update: {
            name: gym.name,
            address: gym.address,
            updated_at: gym.updatedAt,
          },
          create: {
            id: gym.id,
            name: gym.name,
            address: gym.address,
            created_at: gym.createdAt,
            updated_at: gym.updatedAt,
          }
        });
      }),
    );

    const domainSaved = [];
    for (const save of saved) {
      domainSaved.push(GymMapper.toDomain(save));
    }
    return Promise.resolve(domainSaved);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(userId: string): Promise<void> {
    await Promise.resolve();
  }
}
