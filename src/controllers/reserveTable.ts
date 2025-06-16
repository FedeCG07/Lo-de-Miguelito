import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { TableService } from '../services/tableService';

const authService = new AuthService();
const tableService = new TableService();

export async function reserveTable(req: Request, res: Response){
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')
        
        const decodedToken = authService.decodeToken(token);
        const tableNumber: number = +req.params.id;
        await tableService.reserveTable(tableNumber, decodedToken.id);

        res.json({ message: 'Mesa reservada exitosamente' });
    } catch (error) {
        throw error;
    }
}