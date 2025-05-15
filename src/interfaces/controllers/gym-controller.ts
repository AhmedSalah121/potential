import { Gym } from '../../domain/entities/Gym';
import { GymFetchOptions, GymRepository } from '../../domain/repositories/gyp-repository';
import { Response, Request, NextFunction } from 'express';
import { UserFetchOptions } from '../../domain/repositories/user-repository';
import { UserRepository } from '../../domain/repositories/user-repository';

class GymController {
  private readonly gymRepository: GymRepository;
  private readonly userRepository: UserRepository;

  constructor(gymRepository: GymRepository, userRepository: UserRepository) {
    this.gymRepository = gymRepository;
    this.userRepository = userRepository;
  }

  getGyms = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const fos = new GymFetchOptions();
      const gyms = await this.gymRepository.fetch(fos);
      if (gyms.length < 1) {
        res.status(404).json({ message: 'No gyms found' });
      }
      res.status(200).json(gyms);
    } catch (err) {
      next(err);
    }
  }

  createGym = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, address } = req.body;

        if (!name) {
            res.status(400).json({ message: 'Name is required' });
            return;
        }

        if (!address) {
            res.status(400).json({ message: 'Address is required' });
            return;
        }

        // check if name has only letters and numbers and spaces
        if (!/^[a-zA-Z0-9\s]+$/.test(name) || !/^[a-zA-Z0-9\s]+$/.test(address)) {
            res.status(400).json({ message: 'Name and address must contain only letters and numbers' });
            return;
        }

        if (name.length < 3) {
            res.status(400).json({ message: 'Name must be at least 3 characters long' });
            return;
        }

        const gym = new Gym({
            name: name,
            address: address,
            members: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const saved = await this.gymRepository.save([gym]);
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
  }

  addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { gymId, userId } = req.body;

        if (!gymId) {
            res.status(400).json({ message: 'Gym ID is required' });
            return;
        }

        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }

        const gfos = new GymFetchOptions();
        gfos.ids = [gymId];
        const gym = await this.gymRepository.fetch(gfos);

        if (!gym || gym.length < 1) {
            res.status(404).json({ message: 'Gym not found' });
            return;
        }

        const ufos = new UserFetchOptions();
        ufos.ids = [userId];
        const user = await this.userRepository.fetch(ufos);

        if (!user || user.length < 1) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (
            !gym[0].members.some(memberId => memberId === user[0].id) 
            && user[0].id !== undefined 
            && gym[0].id !== undefined
        ) {
            gym[0].members.push(user[0].id);
            user[0].gymId = gym[0].id;
        }

        await this.gymRepository.save([gym[0]]);

        res.status(200).json(user[0]);
    } catch (err) {
        next(err);
    }
  }
}

export default GymController;
