import bcrypt from "bcrypt";
import { ClientRepository } from "../repositories/clientRepository";
import { HTTPError } from '../errors/HTTPError';

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
            
            const passwordMatch = await bcrypt.compare(inputPassword, password);

            if (!passwordMatch) {
                throw new HTTPError('El email o la contraseña es incorrecto.', 401);
            }

            return client;
        } catch (error) {
            throw error;
        }
    }

    async getReservedTable(idClient: number) {
        try {
            const client = await clientRepository.getClientById(idClient);

            const reservedTable = client.reservedTable;

            if (!reservedTable) throw new HTTPError('No tiene ninguna mesa reservada', 404);

            return reservedTable;
        } catch (error) {
            throw error;
        }
    }
}