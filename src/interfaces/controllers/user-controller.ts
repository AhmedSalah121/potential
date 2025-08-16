import { UserFetchOptions, UserRepository } from '../../domain/repositories/user-repository';
import { Response, Request, NextFunction } from 'express';
import './express-extensions';

class UserController {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getUsers = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const fos = new UserFetchOptions();
      const users = await this.userRepository.fetch(fos);
      if (users.length < 1) {
        res.status(404).json({ message: 'No users found' });
      }
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const user = req.user;

    if (!user) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.full_name,
    });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
