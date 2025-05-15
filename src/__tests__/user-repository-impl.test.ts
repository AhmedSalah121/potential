import { PrismaClient } from '@prisma/client';
import { Gender, WorkoutTime } from '../domain/entities/User';
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
          role: UserRole.Member,
          gender: Gender.Male,
          age: 20,
          phone: '1234567890',
          seekingPartner: true,
          preferredTime: WorkoutTime.Morning,
          isTrainer: false,
          hourlyRate: 100,
          gymId: '1',
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
            role: UserRole.Member,
            gender: Gender.Male,
            age: 20,
            phone: '1234567890',
            seekingPartner: true,
            preferredTime: WorkoutTime.Morning,
            isTrainer: false,
            hourlyRate: 100,
            gymId: '1',
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
      await userRepository.save(
        [
          {
            id: '1',
            role: UserRole.Member,
            gender: Gender.Male,
            age: 20,
            phone: '1234567890',
            seekingPartner: true,
            preferredTime: WorkoutTime.Morning,
            isTrainer: false,
            hourlyRate: 100,
            gymId: '1',
            createdAt: now,
            updatedAt: now,
            firstName: 'ahmed',
            lastName: 'salah',
            email: 'a@gmail.com',
          },
        ]
      );

      // Act
      const updated = await userRepository.save([
        {
          id: '1',
          role: UserRole.Member,
          gender: Gender.Male,
          age: 24,
          phone: '1234567890',
          seekingPartner: false,
          preferredTime: WorkoutTime.Morning,
          isTrainer: false,
          hourlyRate: 100,
          gymId: '1',
          createdAt: now,
          updatedAt: now,
          firstName: 'ahmed',
          lastName: 'salah',
          email: 'a@gmail.com',
        },
      ]);

      // Assert
      expect(updated).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: '1',
            age: 24,
            seekingPartner: false,
          },
        ),
        ])
      );
    });
  });
});
