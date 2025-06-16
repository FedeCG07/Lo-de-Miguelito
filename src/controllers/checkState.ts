import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';

const authService = new AuthService();
const orderService = new OrderService();

export async function checkState(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')

        const decodedToken = authService.decodeToken(token);
        
        if (!req.body || decodedToken.role == "Client") {
            const orderStates = await orderService.checkClientsOrdersState(decodedToken.id);
            res.json(orderStates);
        } else {
            const { idOrder } = req.body;
            const orderState = await orderService.checkOrderState(idOrder);
            res.json({ message: 'Estado de la orden ' + idOrder + ': ' + orderState});
        }
    }catch (error) {
        throw error;
    }
}