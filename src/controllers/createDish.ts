import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { MenuService } from '../services/menuService';
import { noAccountError } from '../errors/NoAccountError';
import { HTTPError } from '../errors/HTTPError';

const authService = new AuthService();
const menuService = new MenuService();

export async function createDish(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new noAccountError();

        const decodedToken = authService.decodeToken(token);
        const { name, desc, price, idCategory } = req.body;
        const dish = await menuService.createDish(name, desc, price, idCategory, decodedToken.role)

        res.status(201).json({ message: 'Plato creado exitosamente' });
    } catch (error: any) {
        if (error && error.code === 'P2003') {
            throw new HTTPError('Esa categoría no existe', 404);
        }
        throw error;
    }
}