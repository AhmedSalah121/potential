import express from 'express';
import GymController from '../controllers/gym-controller';
import SupabaseAuth from '../../application/middlewares/supabase-auth';

class GymRouter {
  private readonly gymController: GymController;
  private readonly supabaseAuth: SupabaseAuth;

  constructor(gymController: GymController, supabaseAuth: SupabaseAuth) {
    this.gymController = gymController;
    this.supabaseAuth = supabaseAuth;
  }

  getRouter(): express.Router {
    const router = express.Router();

    router.get('/', this.gymController.getGyms);

    router.post(
      '/create',
      this.supabaseAuth.authMiddleware.bind(this.supabaseAuth),
      // this.roleAuth.requireAdmin.bind(this.roleAuth),
      this.gymController.createGym
    );

    router.post(
      '/add-member',
      this.supabaseAuth.authMiddleware.bind(this.supabaseAuth),
      this.gymController.addMember
    );
    return router;
  }
}

export default GymRouter;
