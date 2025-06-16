import { Request, Response } from 'express';
import { ClientService } from '../services/clientService';

const clientService = new ClientService();

export async function register(req: Request, res: Response) {
    try {
        const { fullName, email, phoneNumber, password, address } = req.body;
        const client = await clientService.register(fullName, email, phoneNumber, password, address);
        res.json({ message: 'Registro exitoso' });
    } catch (error: any) {
        if (error && error.code === 'P2002' && error.constructor?.name === 'PrismaClientKnownRequestError') {
            throw new Error('Este email ya fue registrado');
        }
        
        throw error;
    }
}