import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { TableService } from '../services/tableService';
import { ClientService } from '../services/clientService';

const authService = new AuthService();
const tableService = new TableService();
const clientService = new ClientService();

export async function unreserveTable(req: Request, res: Response){
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función');
        
        const decodedToken = authService.decodeToken(token);

        const tableNumber = req.body;
        if (decodedToken.role == "Client") {
            const tableNumber = await clientService.getReservedTable(decodedToken.id);
        }
        await tableService.unreserveTable(tableNumber, decodedToken.id);

        res.json({ message: 'Reserva terminada exitosamente' });
    } catch (error) {
        throw error;
    }
}