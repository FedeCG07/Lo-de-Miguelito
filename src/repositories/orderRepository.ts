import { Order } from "@prisma/client";

import { db } from "../db/db";

export class OrderRepository {
    async createOrder(idClient: number, amountOfDishes: number, totalPrice: number, discountPercentage: number, deliveryAddress: string) {
        const newOrder = await db.order.create({
            data: {
                idClient,
                amountOfDishes,
                totalPrice,
                discountPercentage,
                deliveryAddress
            }
        })

        if (!newOrder) throw new Error("No se pudo crear la orden")

        return newOrder;
    }

    async getOrder(idOrder: number) {
        const order = await db.order.findUnique({
            where:{
                idOrder
            }
        })

        if (!order) throw new Error("No se encontró la orden: " + idOrder)

        return order;
    }

    async changeOrderState(idOrder: number, idState: number) {
        const updatedOrder = await db.order.update({
            where: {
                idOrder
            }, 
            data: {
                idState
            }
        })

        return updatedOrder;
    }
}