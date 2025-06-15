import { ClientRepository } from "../repositories/clientRepository";

const clientRepository = new ClientRepository();

export class DiscountService {
    async getDiscountPercentage(idClient: number) {
        try {
            const client = await clientRepository.getClientById(idClient);
            const totalOrders = client.totalOrders;
            let discountPercentage = 0;

            if (totalOrders > 3 && totalOrders <= 5) {
                discountPercentage = 10;
            } 
            if (totalOrders > 5 && totalOrders <= 7) {
                discountPercentage = 20;
            } 
            if (totalOrders > 7) {
                discountPercentage = 50;
            }

            return discountPercentage;
        } catch (error) {
            throw error;
        }
    }
}