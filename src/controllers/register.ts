import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';
import { HTTPError } from '../errors/HTTPError';

const clientService = new ClientService();

export async function register(req: Request, res: Response) {
    try {
        const { fullName, email, phoneNumber, password, address } = req.body;
        const client = await clientService.register(fullName, email, phoneNumber, password, address);

        res.status(201).json({ message: 'Registro exitoso' });
    } catch (error: any) {
        if (error && error.code === 'P2002') {
            throw new HTTPError('Este email ya fue registrado', 409);
        }
        
        throw error;
    }
}