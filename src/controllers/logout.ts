import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  res.status(200).json({ message: 'Sesion cerrada exitosamente' });
}