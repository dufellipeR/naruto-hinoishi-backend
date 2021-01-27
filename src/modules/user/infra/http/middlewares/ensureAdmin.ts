import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (!req.user.isAdmin) {
    throw new AppError('NO , NO , NO, NOT HERE HONEY', 403);
  }

  next();
}
