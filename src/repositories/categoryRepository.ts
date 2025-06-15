import { Category } from "@prisma/client";

import { db } from "../db/db";

export class CategoryRepository {
    async createCategory(category: string) {
        const newCategory = await db.category.create({
            data: {
                category
            }
        })

        if (!newCategory) throw new Error("No se pudo crear la categoría")
    }

    async getCategory(idCategory: number) {
        const category = await db.category.findUnique({
            where: {
                idCategory
            }
        })

        if (!category) throw new Error("No se encontró la categoría con id: " + idCategory);

        return category;
    }
}