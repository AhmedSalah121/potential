import { PrismaClient } from '@prisma/client';
import { exec } from 'node:child_process';
import * as util from 'node:util';
import { UserRepository } from '../domain/repositories/user-repository';
import { UserRepositoryImpl } from '../infrastructure/repositories/user-repository-impl';
import { User, UserRole } from '../domain/entities/User';

// Promisify exec for async/await usage
const execAsync = util.promisify(exec);

describe('UserRepository Tests', () => {
  let prisma: PrismaClient;
  let userRepository: UserRepository;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
    userRepository = new UserRepositoryImpl(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Reset and migrate the test database
    await execAsync('npx prisma migrate reset --force');
    await execAsync('npx prisma migrate deploy');
  });

  describe('save()', () => {
    it('should return empty array when empty array is passed', async () => {
      // Arrange
      const users: User[] = [];

      // Act
      const result = await userRepository.save(users);

      // Assert
      expect(result).toHaveLength(0);
    });

    it('insert', async () => {
      // Arrange
      const now = new Date();
      const users: User[] = [
        {
          id: '1',
          role: UserRole.Customer,
          createdAt: now,
          updatedAt: now,
          firstName: 'ahmed',
          lastName: 'salah',
          email: 'a@gmail.com',
        },
      ];

      // Act
      const saved = await userRepository.save(users);

      // Assert
      expect(saved).toHaveLength(1);
      expect(saved).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: '1',
            role: UserRole.Customer,
            createdAt: now,
            updatedAt: now,
            firstName: 'ahmed',
            lastName: 'salah',
            email: 'a@gmail.com',
          }),
        ])
      );
    });

    it('update', async () => {
      // Arrange
      const now = new Date();
      const users: User[] = [
        {
          id: '1',
          role: UserRole.Customer,
          createdAt: now,
          updatedAt: now,
          firstName: 'ahmed',
          lastName: 'salah',
          email: 'a@gmail.com',
        },
      ];

      const before = await userRepository.save(users);

      // Act
      const after = await userRepository.save([
        {
          id: '1',
          role: UserRole.Customer,
          createdAt: now,
          updatedAt: now,
          firstName: "new ahmed",
          lastName: "what?",
          email: "a@gmail.com"
        },
      ]);

      // Assert
      expect(after).toHaveLength(1);
      expect(before).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              id: '1',
              role: UserRole.Customer,
              createdAt: now,
              updatedAt: now,
              firstName: 'ahmed',
              lastName: 'salah',
              email: 'a@gmail.com',
            },
          )
        ])
      )
      expect(after).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: '1',
            role: UserRole.Customer,
            createdAt: now,
            updatedAt: now,
            firstName: "new ahmed",
            lastName: "what?",
            email: "a@gmail.com"
          },),
        ])
      );
    });
  });
});
