import { OrderDishes } from "@prisma/client";

import { db } from "../db/db";

export class OrderDishesRepository {
    async addDishToOrder(idOrder: number, idDish: number, amount: number) {
        const addedDish = await db.orderDishes.create({
            data:{
                idOrder,
                idDish,
                amount
            }
        })

        if (!addedDish) throw new Error("No se pudo agregar el plato " + idDish + " a la orden " + idOrder)

        return addedDish;
    }

    async getDishesByOrder(idOrder: number) {
        const dishes = await db.orderDishes.findMany({
            where: {
                idOrder
            }
        })

        if (!dishes) throw new Error("No se encontró la orden: " + idOrder)

        return dishes;
    }
}