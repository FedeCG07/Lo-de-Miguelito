import { Category } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

import { db } from "../db/db";

export class CategoryRepository {
    async getCategory(idCategory: number) {
        const category = await db.category.findUnique({
            where: {
                idCategory
            }
        })

        if (!category) throw new HTTPError("No se encontró la categoría con id: " + idCategory, 404);

        return category;
    }
}