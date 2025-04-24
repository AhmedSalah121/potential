import express from 'express';
import UserController from '../controllers/user-controller';
import SupabaseAuth from '../../application/middlewares/supabase-auth';

class UserRouter {
  private readonly userController: UserController;
  private readonly supabaseAuth: SupabaseAuth;

  constructor(userController: UserController, supabaseAuth: SupabaseAuth) {
    this.userController = userController;
    this.supabaseAuth = supabaseAuth;
  }

  getRouter(): express.Router {
    const router = express.Router();

    // GET /users
    router.get('/', this.userController.getUsers);

    // GET /profile
    router.get('/profile', this.supabaseAuth.authMiddleware.bind(this.supabaseAuth), this.userController.getProfile);

    return router;
  }
}

export default UserRouter;
