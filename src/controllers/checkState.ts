import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';
import { noAccountError } from '../errors/NoAccountError';

const authService = new AuthService();
const orderService = new OrderService();

export async function checkState(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();

        const decodedToken = authService.decodeToken(token);
        const orderStates = await orderService.checkClientsOrdersState(decodedToken.id);
        
        res.status(200).json(orderStates);
    }catch (error) {
        throw error;
    }
}