import { UserFetchOptions, UserRepository } from '../../domain/repositories/user-repository';
import { PrismaClient } from '@prisma/client';
import { PrismaFilter } from '../database/prisma-client';
import { UserMapper } from '../mappers/user-mappers';
import * as domain from "../../domain/entities/User";

export class UserRepositoryImpl implements UserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async fetch(fetchOptions: UserFetchOptions): Promise<domain.User[]> {
    const where: Record<string, PrismaFilter> = {};
    const {email, ids} = fetchOptions;

    if (ids) {
      where.id = {in: ids};
    }

    if (email) {
      where.email = {in: [email]};
    }

    const users = await this.prisma.user.findMany({where});
    const usersDomain = [];

    for (const user of users) {
      usersDomain.push(UserMapper.toDomain(user));
    }

    return Promise.resolve(usersDomain);
  }

  async save(users: domain.User[]): Promise<domain.User[]> {
    const saved = await Promise.all(
      users.map((user)=> {
        return this.prisma.user.upsert({
          where: {id: user.id},
          update: {
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            gender: user.gender,
            age: user.age,
            phone: user.phone,
            seeking_partner: user.seekingPartner,
            preferred_time: user.preferredTime,
            is_trainer: user.isTrainer,
            hourly_rate: user.hourlyRate,
            gym_id: user.gymId,
            role: user.role,
            updated_at: user.updatedAt,
          },
          create: {
            id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            role: user.role,
            gender: user.gender,
            age: user.age,
            phone: user.phone,
            seeking_partner: user.seekingPartner,
            preferred_time: user.preferredTime,
            is_trainer: user.isTrainer,
            updated_at: user.updatedAt,
            created_at: user.createdAt,
          }
        });
      }),
    );

    const domainSaved = [];
    for (const save of saved) {
      domainSaved.push(UserMapper.toDomain(save));
    }
    return Promise.resolve(domainSaved);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(userId: string): Promise<void> {
    await Promise.resolve();
  }
}
