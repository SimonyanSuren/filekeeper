import { User } from './../../models/user.entity';

export interface JwtPayload {
  sub: number;
  //username: string;
  remoteAddress?: string;
  userAgent?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
