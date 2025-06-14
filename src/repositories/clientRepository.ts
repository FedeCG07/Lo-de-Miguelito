import { Client } from "@prisma/client";

import { db } from "../db/db";
// easter egg 
export class ClientRepository {
    async createClient(fullName: string, email: string, phoneNumber: number, password: string, address: string) {
        const newClient = await db.client.create({
            data: {
                fullName,
                email,
                phoneNumber,
                password,
                address
            }
        })

        if (!newClient) throw new Error("No se pudo crear el usuario");

        return newClient;
    }

    async getClientById(id: number) {
        const client = await db.client.findFirst({
            where: {
                idClient: id
            }
        })

        if (!client) throw new Error("No hay cliente con el id: " + id)

        return client;
    }

    async getClientByEmail(email: string) {
        const cliente = await db.client.findUnique({
            where: {
                email
            }
        })

        if (!cliente) throw new Error("No hay cliente con el email: " + email)


        return cliente;
    }


    async increaseOrdersCount(idClient: number) {
        const updatedClient = await db.client.update({
            where: {
                idClient
            },
            data: {
                totalOrders: {
                    increment: 1
                }
            }
        })

        if (!updatedClient) throw new Error("No se encontró el cliente con id: " + idClient)

        return updatedClient;
    }

    async setDiscountPercentage(idClient: number, discountPercentage: number) {
        const updatedClient = await db.client.update({
            where: {
                idClient
            },
            data: {
                discountPercentage
            }
        })

        if (!updatedClient) throw new Error("No se encontró el cliente con id: " + idClient)

        return updatedClient;
    }

    async reserveTable(idClient: number, tableNumber: number) {
        const updatedClient = await db.client.update({
            where: {
                idClient
            },
            data: {
                reservedTable: tableNumber
            }
        })

        if (!updatedClient) throw new Error("No se encontró el cliente con id: " + idClient)

        return updatedClient;
    }
}