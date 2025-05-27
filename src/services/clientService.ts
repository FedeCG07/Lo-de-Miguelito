import { Client } from "@prisma/client";

import { db } from "../db/db";

interface CreateClientBody {
  fullName: string
  email: string
  phoneNumber: number
  password: string
  address: string
}

export class clientService {
    async register(fullName: string, email: string, phoneNumber: number, password: string, address: string){
        try {
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
        } catch (error) {}
    }

    async logIn(email: string, inputPassword: string){
        try {
            const password = await db.client.findUnique({
                where: {
                    email
                },
                select: {
                    password: true
                }
            })

            const clientPassword = password?.password;

            if (clientPassword == inputPassword) {
                return await db.client.findUnique({
                    where: {
                        email
                    },
                    select: {
                        idClient: true
                    }
                })
            } else {
                throw new Error('El email o la contraseña es incorrecto.');
            }
        } catch (error) {}
    }
}