// src/infrastructure/mappers/user.mapper.ts
import { User, UserRole } from '../../domain/entities/User';
import { $Enums, User as PrismaUser } from '@prisma/client';
import * as domain from "../../domain/entities/User";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserMapper {
  public static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      firstName: prismaUser.firstName || '',
      lastName: prismaUser.lastName || '',
      email: prismaUser.email,
      role: UserMapper.toDomainRole(prismaUser.role),
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  // Convert Domain User to Prisma User
  public static toDatabase(user: User): PrismaUser {
    return {
      id: user.id || '',
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: UserMapper.toDatabaseRole(user.role),
      createdAt: user.createdAt || new Date(),
      updatedAt: user.updatedAt || new Date(),
    };
  }

  private static toDomainRole(role: string): domain.UserRole {
    switch (role) {
      case 'CUSTOMER':
        return domain.UserRole.Customer;
      case 'ADMIN':
        return domain.UserRole.Admin;
      case 'MERCHANT':
        return domain.UserRole.Merchant;
      default:
        throw new Error(`Invalid user role: ${role}`);
    }
  }

  private static toDatabaseRole(
    status: domain.UserRole,
  ): $Enums.UserRole {
    switch (status) {
      case domain.UserRole.Customer:
        return UserRole.Customer;
      case domain.UserRole.Admin:
        return UserRole.Admin;
      case domain.UserRole.Merchant:
        return UserRole.Merchant;
    }
  }
}
