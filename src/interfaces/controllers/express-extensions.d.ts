import { User } from '@supabase/supabase-js';

// Extend Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export {};
