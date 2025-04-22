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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            updatedAt: user.updatedAt,
            role: user.role,
          },
          create: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
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
