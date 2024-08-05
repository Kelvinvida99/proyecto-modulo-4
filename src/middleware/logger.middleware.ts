import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `Date: ${new Date().toISOString()}, metodo: ${req.method}, ruta: ${req.url}`,
  );
  next();
}
