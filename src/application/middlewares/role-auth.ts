import { NextFunction, Request, Response } from 'express';
import { UserRole } from '../../domain/entities/User';
import { UserFetchOptions, UserRepository } from '../../domain/repositories/user-repository';

class RoleAuth {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Middleware to check if the user has the required role
   * @param roles - Array of roles that are allowed to access the endpoint
   * @returns Express middleware function
   */
  requireRoles = (roles: UserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Ensure user is authenticated and available in request
        if (!req.user || !req.user.id) {
          return res.status(401).json({ error: 'Authentication required' });
        }

        // Get user from database to check role
        const fos = new UserFetchOptions();
        fos.ids = [req.user.id];
        const user = await this.userRepository.fetch(fos);
        
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Check if user has one of the required roles
        if (!roles.includes(user[0].role)) {
          return res.status(403).json({ 
            error: 'Insufficient permissions to access this resource' 
          });
        }

        // User has required role, proceed
        next();
      } catch (error) {
        next(error);
      }
    };
  };

  /**
   * Shorthand middleware to require admin role
   */
  requireAdmin = this.requireRoles([UserRole.Admin]);
}

export default RoleAuth; 
