import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';
import { noAccountError } from '../errors/NoAccountError';
import { HTTPError } from '../errors/HTTPError';

const authService = new AuthService();
const orderService = new OrderService();

export async function updateState(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();

        const decodedToken = authService.decodeToken(token);
        const idOrder: number = +req.params.id;
        const { idState } = req.body;

        await orderService.updateOrderState(idOrder, idState, decodedToken.role);
        
        res.status(200).json({ message: 'Se ha actualizado el estado de la orden' });
    } catch (error: any) {
        if (error && error.code === 'P2003') {
            throw new HTTPError('Ese estado no existe', 404);
        }
        throw error;
    }
}