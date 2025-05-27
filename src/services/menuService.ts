import { Menu } from "@prisma/client";

import { db } from "../db/db";

export class menuService {
    async getDishes() {
        try {
            const dishes = await db.menu.findMany({
                select: {
                    name: true,
                    desc: true,
                    price: true
                }
            })
        } catch (error) {}
    }
}