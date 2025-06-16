import { Order } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

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

        if (!newOrder) throw new HTTPError("No se pudo crear la orden", 500)

        return newOrder;
    }

    async getOrder(idOrder: number) {
        const order = await db.order.findUnique({
            where:{
                idOrder
            }
        })

        if (!order) throw new HTTPError("No se encontró la orden: " + idOrder, 404)

        return order;
    }

    async getClientsOrders(idClient: number) {
        const orders = await db.order.findMany({
            where: {
                idClient
            }
        })

        if (orders.length === 0) throw new HTTPError('No tiene ninguna orden activa', 404)

        return orders;
    }

    async changeOrderState(idOrder: number, idState: number) {
        const updatedOrder = await db.order.updateMany({
            where: {
                idOrder
            }, 
            data: {
                idState
            }
        })

        if (updatedOrder.count === 0) throw new HTTPError('No se encontró la orden número ' + idOrder, 404)

        return updatedOrder;
    }
}