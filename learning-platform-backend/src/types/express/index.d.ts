// src/types/express/index.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
    };
  }
}
// src/types/express/index.d.ts
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        isAdmin?: boolean;
      };
    }
  }
}