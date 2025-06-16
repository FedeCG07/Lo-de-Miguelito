import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';
import { AuthService } from '../services/authService';
import { HTTPError } from '../errors/HTTPError';

const clientService = new ClientService();
const authService = new AuthService();

export async function login(req: Request, res: Response) {
    try {
        const oldToken = req.cookies?.token;

        if (oldToken) {
            throw new HTTPError('Ya hay una sesión iniciada', 409);
        }

        const { email, password } = req.body;

        const client = await clientService.logIn(email, password);

        const token = authService.createToken({
            id: client.idClient,
            role: client.role,
        });

        res.cookie('token', token, {
            httpOnly: true,       // prevents JS access (safe)
            secure: false,        // set to true if using HTTPS
            sameSite: 'strict',      // solo permite usarla en el mismo dominio de origen
            maxAge: 1000 * 60 * 60 // 1 hour
        });

        res.status(200).json({ message: 'Inicio de sesón exitoso' });
    } catch (error) {
        throw error;
    }
}