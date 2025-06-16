import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';

const authService = new AuthService();
const orderService = new OrderService();

export async function checkAdminState(req: Request, res: Response) {
    try {
            const token = req.cookies?.token;

            if (!token) throw new Error('Debe iniciar sesión para usar esta función')
            
            const decodedToken = authService.decodeToken(token);
            const idOrder: number = +req.params.id;
            const orderState = await orderService.checkOrderState(idOrder, decodedToken.role);

            res.json({ message: 'Estado de la orden ' + idOrder + ': ' + orderState});
    } catch (error) {
        throw error;
    }
}