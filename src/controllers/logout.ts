import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
  const token = req.cookies?.token;

  if (!token) throw new Error('No hay ninguna sesión iniciada')
    
  res.clearCookie('token', { 
    httpOnly: true, 
    secure: false,
    sameSite: 'strict' 
  });
  res.status(200).json({ message: 'Sesion cerrada exitosamente' });
}