import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';
import { noAccountError } from '../errors/NoAccountError';

const authService = new AuthService();
const orderService = new OrderService();

export async function checkAdminState(req: Request, res: Response) {
    try {
            const token = req.cookies?.token;

            if (!token) throw new noAccountError();
            
            const decodedToken = authService.decodeToken(token);
            const idOrder: number = +req.params.id;
            const orderState = await orderService.checkOrderState(idOrder, decodedToken.role);

            res.status(200).json({ message: 'Estado de la orden ' + idOrder + ': ' + orderState});
    } catch (error) {
        throw error;
    }
}