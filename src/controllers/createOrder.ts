import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';

const authService = new AuthService();
const orderService = new OrderService();

export async function createOrder(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')

        const decodedToken = authService.decodeToken(token);
        const order = await orderService.createOrder(req.body, decodedToken.id);

        res.json({ message: 'Su orden es la número ' + order.idOrder });
    }catch (error) {
        throw error;
    }
}