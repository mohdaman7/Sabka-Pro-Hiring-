import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type UserRole = 'student' | 'employer' | 'admin';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Missing token' });
  }
  const token = header.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as { id: string; role: UserRole };
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

export function authorize(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
}
