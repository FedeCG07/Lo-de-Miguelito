import { Request, Response } from 'express';
import { MenuService } from '../services/menuService';

const menuService = new MenuService();

export async function dishes(_: Request, res: Response) {
    try {
        const dishes = await menuService.getAllDishes();
        res.json(dishes);
    } catch (error) {
        throw error;
    }
}