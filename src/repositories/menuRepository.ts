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

            return newDish;
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

    async getDishPrice(idDish: number) {
        const price = await db.menu.findFirst({
            where : {
                idDish
            },
            select: {
                price: true
            }
        })

        return price?.price;
    }

    async deleteDish(idDish: number) {
        const deletedDish = await db.menu.delete({
            where: {
                idDish
            }
        })

        return deletedDish;
    }
}