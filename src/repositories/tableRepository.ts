import { Table } from "@prisma/client";

import { db } from "../db/db"

export class TableRepository {
    async getTable(tableNumber: number) {
        const table = await db.table.findFirst({
            where: {
                tableNumber
            }
        })

        if (!table) throw new Error("No se encontró la mesa número " + tableNumber)

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

        if (updatedTable.count === 0) throw new Error("No se encontró la mesa número " + tableNumber)

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

        if (updatedTable.count === 0) throw new Error("No se encontró la mesa número " + tableNumber)

        return updatedTable;
    }

    async checkAllAvailableTables() {
        const tables = await db.table.findMany({
            where: {
                reserved: false
            } 
        })

        if (!tables) throw new Error("No hay mesas disponibles en este menú")

        return tables;
    }
}