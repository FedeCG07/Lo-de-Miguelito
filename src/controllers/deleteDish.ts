import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { MenuService } from '../services/menuService';

const authService = new AuthService();
const menuService = new MenuService();

export async function deleteDish(req: Request, res: Response) {
    try {
        const token = req.cookies?.token;

        if (!token) throw new Error('Debe iniciar sesión para usar esta función')

        const idDish: number = +req.params.id;
        const decodedToken = authService.decodeToken(token);
        const dish = await menuService.deleteDish(idDish, decodedToken.role);

        res.json({ message: 'Plato borrado exitosamente' });
    } catch (error) {
        throw error;
    }
}