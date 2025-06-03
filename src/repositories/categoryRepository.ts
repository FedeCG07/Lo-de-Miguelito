import { Category } from "@prisma/client";

import { db } from "../db/db";

export class CategoryRepository {
    async createCategory(category: string) {
        const newCategory = await db.category.create({
            data: {
                category
            }
        })
    }

    async getCategoryById(idCategory: number) {
        const category = await db.category.findUnique({
            where: {
                idCategory
            },
            select: {
                category: true
            }
        })

        return category
    }
}