import { Client } from "@prisma/client";

import { db } from "../db/db";

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

            return newClient;
    }

    async getPasswordByEmail(email: string) {
        const password = await db.client.findUnique({
            where: {
                email
            },
            select: {
                password: true
            }
        })

        return password;
    }

    async getClientIdByEmail(email: string) {
        const id = await db.client.findUnique({
            where: {
                email
            },
            select: {
                idClient: true
            }
        })

        return id;
    }
}