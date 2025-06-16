import bcrypt from "bcrypt";
import { ClientRepository } from "../repositories/clientRepository";

interface CreateClientBody {
  fullName: string
  email: string
  phoneNumber: number
  password: string
  address: string
}

const clientRepository = new ClientRepository();

export class ClientService {
    async register(fullName: string, email: string, phoneNumber: number, password: string, address: string){
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newClient = await clientRepository.createClient(fullName, email, phoneNumber, hashedPassword, address);
            return newClient;
        } catch (error) {
            throw error;
        }
    }

    async logIn(email: string, inputPassword: string){
        try {
            const client = await clientRepository.getClientByEmail(email);

            const password = client.password;

            if (!password) {
                throw new Error('El email no está registrado.');
            }
            
            const passwordMatch = await bcrypt.compare(inputPassword, password);

            if (!passwordMatch) {
                throw new Error('El email o la contraseña es incorrecto.');
            }

            return client;
        } catch (error) {
            throw error;
        }
    }

    async getReservedTable(idClient: number) {
        const client = await clientRepository.getClientById(idClient);

        const reservedTable = client.reservedTable;

        if (!reservedTable) throw new Error('No tiene ninguna mesa reservada');

        return reservedTable;
    }
}