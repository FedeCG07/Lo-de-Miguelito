import { Order } from "@prisma/client";

import { db } from "../db/db";
import { isDataView } from "util/types";

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
    }

    async getOrderState(idOrder: number) {
        const idState = await db.order.findUnique({
            where:{
                idOrder
            }, 
            select: {
                idState: true
            }
        })

        return idState;
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
    }
}