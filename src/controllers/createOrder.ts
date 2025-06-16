import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';
import { noAccountError } from '../errors/NoAccountError';

const authService = new AuthService();
const orderService = new OrderService();

export async function createOrder(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();

        const decodedToken = authService.decodeToken(token);
        const order = await orderService.createOrder(req.body, decodedToken.id);

        res.status(201).json({ message: 'Su orden es la número ' + order.idOrder });
    }catch (error) {
        throw error;
    }
}