import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';

const authService = new AuthService();
const orderService = new OrderService();

export async function updateState(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')

        const decodedToken = authService.decodeToken(token);
        const idOrder: number = +req.params.id;
        const { idState } = req.body;

        await orderService.updateOrderState(idOrder, idState, decodedToken.role);
        
        res.json({ message: 'Se ha actualizado el estado de la orden' });
    } catch (error) {
        throw error;
    }
}