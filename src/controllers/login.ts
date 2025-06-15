import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';
import { AuthService } from '../services/authService';

const clientService = new ClientService();
const authService = new AuthService();

export async function login(req: Request, res: Response) {
    try {
        const oldToken = req.cookies?.token;

        if (oldToken) {
            throw new Error('Ya hay una sesión iniciada');
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
            sameSite: 'lax',      // or 'strict' or 'none'
            maxAge: 60 * 1000 // 1 hour
        });

        res.json({ message: 'Inicio de sesón exitoso' });
    } catch (error) {
        throw error;
    }
}