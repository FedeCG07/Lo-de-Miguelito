import { OrderDishes } from "@prisma/client";

import { db } from "../db/db";

export class OrderDishesRepository {
    async addDishToOrder(idOrder: number, idDish: number) {
        const addedDish = await db.orderDishes.create({
            data:{
                idOrder,
                idDish
            }
        })

        return addedDish;
    }

    async getDishesByOrder(idOrder: number) {
        const dishes = await db.orderDishes.findMany({
            where: {
                idOrder
            },
            select: {
                idDish: true
            }
        })

        return dishes;
    }
}