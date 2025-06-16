import { Request, Response } from 'express';
import { HTTPError } from '../errors/HTTPError';

export function logout(req: Request, res: Response) {
  try {
    const token = req.cookies?.token;

    if (!token) throw new HTTPError('No hay ninguna sesión iniciada', 401)
      
    res.clearCookie('token', { 
      httpOnly: true, 
      secure: false,
      sameSite: 'strict' 
    });
    res.status(200).json({ message: 'Sesion cerrada exitosamente' });
  } catch (error) {
    throw error;
  }
}