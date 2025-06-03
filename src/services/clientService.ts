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
            const newClient = clientRepository.createClient(fullName, email, phoneNumber, password, address);

            return newClient;
        } catch (error) {}
    }

    async logIn(email: string, inputPassword: string){
        try {
            const password = await clientRepository.getPasswordByEmail(email);

            const clientPassword = password?.password;

            if (clientPassword == inputPassword) {
                const idClient = clientRepository.getClientIdByEmail(email);
            } else {
                throw new Error('El email o la contraseña es incorrecto.');
            }
        } catch (error) {}
    }
}