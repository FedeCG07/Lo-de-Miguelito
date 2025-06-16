import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { MenuService } from '../services/menuService';

const authService = new AuthService();
const menuService = new MenuService();

export async function createDish(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')

        const decodedToken = authService.decodeToken(token);
        const { name, desc, price, idCategory } = req.body;
        const dish = await menuService.createDish(name, desc, price, idCategory, decodedToken.role)

        res.json({ message: 'Plato creado exitosamente' });
    } catch (error) {
        throw error;
    }
}