import { Table } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

import { db } from "../db/db"

export class TableRepository {
    async getTable(tableNumber: number) {
        const table = await db.table.findFirst({
            where: {
                tableNumber
            }
        })

        if (!table) throw new HTTPError("No se encontró la mesa número " + tableNumber, 404)

        return table;

    }

    async reserveTable(tableNumber: number) {
        const updatedTable = await db.table.updateMany({
            where: {
                tableNumber
            },
            data: {
                reserved: true
            }
        })

        if (updatedTable.count === 0) throw new HTTPError("No se encontró la mesa número " + tableNumber, 404)

        return updatedTable;
    }

    async unreserveTable(tableNumber: number) {       
        const updatedTable = await db.table.updateMany({
            where: {
                tableNumber
            },
            data: {
                reserved: false
            }
        }) 

        if (updatedTable.count === 0) throw new HTTPError("No se encontró la mesa número " + tableNumber, 404)

        return updatedTable;
    }

    async checkAllAvailableTables() {
        const tables = await db.table.findMany({
            where: {
                reserved: false
            } 
        })

        if (tables.length === 0) throw new HTTPError("No hay mesas disponibles en este momento", 404)

        return tables;
    }
}