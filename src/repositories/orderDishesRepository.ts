import { OrderDishes } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

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

        if (!addedDish) throw new HTTPError("No se pudo agregar el plato " + idDish + " a la orden " + idOrder, 500)

        return addedDish;
    }

    async getDishesByOrder(idOrder: number) {
        const dishes = await db.orderDishes.findMany({
            where: {
                idOrder
            }
        })

        if (!dishes) throw new HTTPError("No se encontró la orden: " + idOrder, 404)

        return dishes;
    }
}