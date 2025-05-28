import { Client } from "@prisma/client";

import { db } from "../db/db";

interface CreateClientBody {
  fullName: string
  email: string
  phoneNumber: number
  password: string
  address: string
}

export class ClientService {
    async register(fullName: string, email: string, phoneNumber: number, password: string, address: string){
        try {
            //llamar repository
        } catch (error) {}
    }

    async logIn(email: string, inputPassword: string){
        try {
            
            //Usar repository

            //const clientPassword = password?.password;

            //if (clientPassword == inputPassword) {

            //} else {
                //throw new Error('El email o la contraseña es incorrecto.');
            //}
        } catch (error) {}
    }
}