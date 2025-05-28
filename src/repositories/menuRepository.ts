import { Menu } from "@prisma/client";

import { db } from "../db/db";

export class MenuRepository {
    async createDish(name: string, desc: string, price: number, idCategory: number) {
        
    }

    async getAllDishesDetails() {
        const dishes = await db.menu.findMany({
            select: {
                name: true,
                desc: true,
                price: true,
                idCategory: true
            }
        })

        return dishes;
    }
}