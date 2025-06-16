import { Client } from "@prisma/client";
import { HTTPError } from '../errors/HTTPError';

import { db } from "../db/db";
import { table } from "console";
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

        if (!newClient) throw new HTTPError("No se pudo crear el usuario", 500);

        return newClient;
    }

    async getClientById(id: number) {
        const client = await db.client.findFirst({
            where: {
                idClient: id
            }
        })

        if (!client) throw new HTTPError("No hay cliente con el id: " + id, 404)

        return client;
    }

    async getClientByEmail(email: string) {
        const client = await db.client.findUnique({
            where: {
                email
            }
        })

        if (!client) throw new HTTPError("No hay cliente con el email: " + email, 404)


        return client;
    }

    async getClientbyTableNumber(reservedTable: number) {
        const client = await db.client.findFirst({
            where: {
                reservedTable
            }
        })

        if (!client) throw new HTTPError("Ningún cliente ha reservado esta mesa", 404);

        return client;
    }

    async increaseOrdersCount(idClient: number) {
        const updatedClient = await db.client.updateMany({
            where: {
                idClient
            },
            data: {
                totalOrders: {
                    increment: 1
                }
            }
        })

        if (updatedClient.count === 0) throw new HTTPError("No se encontró el cliente con id: " + idClient, 404);

        return updatedClient;
    }

    async reserveTable(idClient: number, tableNumber: number) {
        const updatedClient = await db.client.updateMany({
            where: {
                idClient
            },
            data: {
                reservedTable: tableNumber
            }
        })

        if (updatedClient.count === 0) throw new HTTPError("No se encontró el cliente con id: " + idClient, 404);

        return updatedClient;
    }

    async unreserveTable(idClient: number) {
        const updatedClient = await db.client.updateMany({
            where: {
                idClient
            },
            data: {
                reservedTable: null
            }
        })

        if (updatedClient.count === 0) throw new HTTPError("No se encontró el cliente con id: " + idClient, 404);

        return updatedClient;
    }
}