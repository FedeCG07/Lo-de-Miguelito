import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { TableService } from '../services/tableService';
import { noAccountError } from '../errors/NoAccountError';

const authService = new AuthService();
const tableService = new TableService();

export async function unreserveAdminTable(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();
        
        const decodedToken = authService.decodeToken(token);
        const tableNumber: number = +req.params.id;

        await tableService.unreserveTable(tableNumber, decodedToken.role);

        res.status(200).json({ message: 'Reserva terminada exitosamente' });
    } catch (error) {
        throw error;
    }
}