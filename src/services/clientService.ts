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
        } catch (error) {}
    }

    async logIn(email: string, inputPassword: string){
        try {
            const password = await clientRepository.getPasswordByEmail(email);

            if (!password) {
                throw new Error('El email no está registrado.');
            }
            
            const passwordMatch = await bcrypt.compare(inputPassword, password?.password);

            if (!passwordMatch) {
                throw new Error('El email o la contraseña es incorrecto.');
            }

            const idClient = await clientRepository.getClientIdByEmail(email);
            const role = await clientRepository.getClientRole(idClient);
            return { token: idClient, role };
        } catch (error) {}
    }
}