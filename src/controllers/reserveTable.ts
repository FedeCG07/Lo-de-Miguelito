import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { TableService } from '../services/tableService';
import { noAccountError } from '../errors/NoAccountError';

const authService = new AuthService();
const tableService = new TableService();

export async function reserveTable(req: Request, res: Response){
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();
        
        const decodedToken = authService.decodeToken(token);
        const tableNumber: number = +req.params.id;
        await tableService.reserveTable(tableNumber, decodedToken.id);

        res.status(200).json({ message: 'Mesa reservada exitosamente' });
    } catch (error) {
        throw error;
    }
}