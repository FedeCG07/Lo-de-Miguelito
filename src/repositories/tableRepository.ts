import { Table } from "@prisma/client";

import { db } from "../db/db"

export class TableRepository {
    async getTableIdByTableNumber(tableNumber: number) {
        const result = await db.table.findFirst({
            where: {
                tableNumber
            },
            select: {
                idTable: true
            }
        })

        return result?.idTable ?? null;

    }

    async reserveTable(idTable: number) {
        const updatedTable = await db.table.update({
        where: {
            idTable
        },
        data: {
            reserved: true
        }
        })

        return updatedTable;
    }

    async cancelTableReservation(idTable: number) {       
        const updatedTable = await db.table.update({
            where: {
                idTable
            },
            data: {
                reserved: false
            }
        }) 

        return updatedTable;
    }

    async checkTableAvailability(idTable: number) {
        const availability = await db.table.findFirst({
            where: {
                idTable
            },
            select: {
                reserved: true
            }
        })

        return availability;
    }

    async checkAllAvailableTables() {
        const availability = await db.table.findMany({
            where: {
                reserved: false
            },
            select: {
                tableNumber: true
            }   
        })

        return availability;
    }
}