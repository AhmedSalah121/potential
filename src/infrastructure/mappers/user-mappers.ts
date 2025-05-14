// src/infrastructure/mappers/user.mapper.ts
import { User } from '../../domain/entities/User';
import { $Enums, Gender, User as PrismaUser } from '@prisma/client';
import * as domain from "../../domain/entities/User";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserMapper {
  public static toDomain(prismaUser: PrismaUser): User {
    return new User({
      id: prismaUser.id,
      firstName: prismaUser.first_name || '',
      lastName: prismaUser.last_name || '',
      email: prismaUser.email,
      role: UserMapper.toDomainRole(prismaUser.role),
      gender: UserMapper.toDomainGender(prismaUser.gender),
      age: prismaUser.age,
      phone: prismaUser.phone || '' ,
      seekingPartner: prismaUser.seeking_partner,
      preferredTime: UserMapper.toDomainWorkoutTime(prismaUser.preferred_time),
      isTrainer: prismaUser.is_trainer,
      hourlyRate: prismaUser.hourly_rate || 0,
      gymId: prismaUser.gym_id || '',
      createdAt: prismaUser.created_at,
      updatedAt: prismaUser.updated_at,
    });
  }

  // Convert Domain User to Prisma User
  public static toDatabase(user: User): PrismaUser {
    return {
      id: user.id || '',
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      role: UserMapper.toDatabaseRole(user.role),
      gender: UserMapper.toDatabaseGender(user.gender),
      age: user.age,
      phone: user.phone,
      seeking_partner: user.seekingPartner,
      preferred_time: UserMapper.toDatabaseWorkoutTime(user.preferredTime),
      is_trainer: user.isTrainer,
      hourly_rate: user.hourlyRate,
      gym_id: user.gymId,
      created_at: user.createdAt || new Date(),
      updated_at: user.updatedAt || new Date(),
    };
  }

  private static toDomainRole(role: $Enums.Role): domain.UserRole {
    switch (role) {
      case 'MEMBER':
        return domain.UserRole.Member;
      case 'ADMIN':
        return domain.UserRole.Admin;
      case 'TRAINER':
        return domain.UserRole.Trainer;
      default: {
        const exhaustiveCheck: never = role;
        throw new Error(`Invalid user role: ${exhaustiveCheck}`);
      }
    }
  }

  private static toDatabaseRole(
    status: domain.UserRole,
  ): $Enums.Role {
    switch (status) {
      case domain.UserRole.Member:
        return domain.UserRole.Member; // String value 'MEMBER'
      case domain.UserRole.Admin:
        return domain.UserRole.Admin;   // String value 'ADMIN'
      case domain.UserRole.Trainer:
        return domain.UserRole.Trainer; // String value 'TRAINER'
      default: {
        const exhaustiveCheck: never = status;
        throw new Error(`Invalid domain user role: ${exhaustiveCheck}`);
      }
    }
  }
  
  private static toDatabaseGender(
    gender: domain.Gender,
  ): $Enums.Gender {
    switch (gender) {
      case domain.Gender.Male:
        return Gender.MALE; // Prisma's Gender.MALE which is 'MALE'
      case domain.Gender.Female:
        return Gender.FEMALE; // Prisma's Gender.FEMALE which is 'FEMALE'
      default: {
        const exhaustiveCheck: never = gender;
        throw new Error(`Invalid domain gender: ${exhaustiveCheck}`);
      }
    }
  }
  private static toDomainGender(
    gender: $Enums.Gender,
  ): domain.Gender {
    switch (gender) {
      case Gender.MALE:
        return domain.Gender.Male;
      case Gender.FEMALE:
        return domain.Gender.Female;
      default: {
        const exhaustiveCheck: never = gender;
        throw new Error(`Invalid Prisma gender: ${exhaustiveCheck}`);
      }
    }
  }

  private static toDomainWorkoutTime(time: $Enums.WorkoutTime | null): domain.WorkoutTime {
    if (!time) {
      return domain.WorkoutTime.Any;
    }
    switch (time) {
      case 'MORNING':
        return domain.WorkoutTime.Morning;
      case 'AFTERNOON':
        return domain.WorkoutTime.Afternoon;
      case 'EVENING':
        return domain.WorkoutTime.Evening;
      case 'ANY':
        return domain.WorkoutTime.Any;
      default: {
        // This ensures exhaustiveness if Prisma adds new enum members not covered by domain.WorkoutTime
        const exhaustiveCheck: never = time; 
        console.warn(`Unexpected WorkoutTime value from database: ${exhaustiveCheck}`);
        return domain.WorkoutTime.Any; // Fallback safely
      }
    }
  }

  private static toDatabaseWorkoutTime(time: domain.WorkoutTime): $Enums.WorkoutTime {
    switch (time) {
      case domain.WorkoutTime.Morning:
        return 'MORNING';
      case domain.WorkoutTime.Afternoon:
        return 'AFTERNOON';
      case domain.WorkoutTime.Evening:
        return 'EVENING';
      case domain.WorkoutTime.Any:
        return 'ANY';
      default: {
        // This ensures exhaustiveness for domain.WorkoutTime members
        const exhaustiveCheck: never = time;
        console.warn(`Unexpected WorkoutTime value from domain: ${exhaustiveCheck}`);
        return 'ANY'; // Fallback safely
      }
    }
  }
}
