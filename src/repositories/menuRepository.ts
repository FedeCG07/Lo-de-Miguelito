import { Menu } from "@prisma/client";

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

        if (!newDish) throw new Error("No se pudo crear el plato")

        return newDish;
    }

    async getDishById(idDish: number) {
        const dish = await db.menu.findFirst({
            where: {
                idDish
            }
        })

        if (!dish) throw new Error("No se encontró el plato con id: " + idDish)

        return dish;
    }

    async getAllDishes() {
        return await db.menu.findMany();
    }

    async deleteDish(idDish: number) {
        const deletedDish = await db.menu.delete({
            where: {
                idDish
            }
        })

        if (!deletedDish) throw new Error("No se encontró el plato con id: " + idDish)

        return deletedDish;
    }
}