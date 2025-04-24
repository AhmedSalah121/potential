import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

class SupabaseAuth {
  private readonly supabaseUrl: string;
  private readonly supabaseServiceKey: string;
  public supabase: SupabaseClient;

  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL || '';
    this.supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
    this.supabase = createClient(this.supabaseUrl, this.supabaseServiceKey);
  }

  authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authorization token required' });
      return;
    }

    try {
      req.user = await this.verifyAuthToken(token);
      next();
    } catch (error) {
      res.status(403).json({
        error: error instanceof Error ? error.message : 'Forbidden'
      });
    }
  };


  async verifyAuthToken(jwt: string) {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(jwt);

    if (error) {
      throw new Error('Invalid authentication token');
    }

    if (!user) {
      throw new Error('User not found');
    }

    const { data: identities } = await this.supabase
      .from('identities')
      .select('provider')
      .eq('user_id', user.id);

    const isGoogleUser = identities?.some(
      (identity) => identity.provider === 'google'
    );

    if (!isGoogleUser) {
      throw new Error('Only Google authentication is allowed');
    }

    return user;
  }

}

export default SupabaseAuth;
