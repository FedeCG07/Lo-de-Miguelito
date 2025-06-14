import { OrderRepository } from "../repositories/orderRepository";
import { OrderDishesRepository } from "../repositories/orderDishesRepository";
import { MenuRepository } from "../repositories/menuRepository";
import { ClientRepository } from "../repositories/clientRepository";

interface CreateOrderItem {
  idDish: number;
  amount: number;
}

type CreateOrderBody = CreateOrderItem[];

const orderRepository = new OrderRepository();
const orderDishesRepository = new OrderDishesRepository();
const menuRepository = new MenuRepository();
const clientRepository = new ClientRepository();

export class OrderService {
    async createOrder(data: CreateOrderItem[], idClient: number) {
        try {
            let amountOfDishes = 0;
            let totalPrice = 0;
            for (const item of data) {
                amountOfDishes += item.amount;
                const price = await menuRepository.getDishPrice(item.idDish);
                if (price) {
                    for (var i = 0; i < item.amount; i++) {
                        totalPrice += price;
                    }
                } else {
                    throw new Error('El plato no existe.');
                }
            }

            const client = await clientRepository.getClientById(idClient);
            const discountPercentage  = client.discountPercentage;
            const address = client.address;

            const newOrder = await orderRepository.createOrder(idClient, amountOfDishes, totalPrice, discountPercentage, address);
        } catch(err) {
            throw new Error((err as Error).message)
        }
    }
}