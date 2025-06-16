import { Menu } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

import { db } from "../db/db";

export class MenuRepository {
    async createDish(name: string, desc: string, price: number, idCategory: number) {
        const newDish = await db.menu.create({
            data: {
                name,
                desc,
                price,
                idCategory
            }
        })

        if (!newDish) throw new HTTPError("No se pudo crear el plato", 500)

        return newDish;
    }

    async getDishById(idDish: number) {
        const dish = await db.menu.findFirst({
            where: {
                idDish
            }
        })

        if (!dish) throw new HTTPError("No se encontró el plato con id: " + idDish, 404)

        return dish;
    }

    async getAllDishes() {
        return await db.menu.findMany();
    }

    async deleteDish(idDish: number) {
        const deletedDish = await db.menu.deleteMany({
            where: {
                idDish
            }
        })

        if (deletedDish.count === 0) throw new HTTPError("No se encontró el plato con id: " + idDish, 404)

        return deletedDish;
    }
}