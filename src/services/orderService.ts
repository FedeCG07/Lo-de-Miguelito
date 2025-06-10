import { OrderRepository } from "../repositories/orderRepository";
import { OrderDishesRepository } from "../repositories/orderDishesRepository";
import { MenuRepository } from "../repositories/menuRepository";

interface CreateOrderItem {
  idDish: number;
  amount: number;
}

type CreateOrderBody = CreateOrderItem[];

const orderRepository = new OrderRepository();
const orderDishesRepository = new OrderDishesRepository();
const menuRepository = new MenuRepository();

export class OrderService {
    async createOrder(data: CreateOrderItem[]) {
        let amountOfDishes = 0;
        for (const item of data) {
            amountOfDishes += item.amount;
        }
    }
}