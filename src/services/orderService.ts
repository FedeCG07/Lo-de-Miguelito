import { OrderRepository } from "../repositories/orderRepository";
import { OrderDishesRepository } from "../repositories/orderDishesRepository";
import { MenuRepository } from "../repositories/menuRepository";
import { ClientRepository } from "../repositories/clientRepository";
import { DiscountService } from "./discountService";
import { StateRepository } from "../repositories/stateRepository";
import { stat } from "fs";
import { error } from "console";

interface CreateOrderItem {
  idDish: number;
  amount: number;
}

export type CreateOrderBody = CreateOrderItem[];

const orderRepository = new OrderRepository();
const orderDishesRepository = new OrderDishesRepository();
const menuRepository = new MenuRepository();
const clientRepository = new ClientRepository();
const discountService = new DiscountService();
const stateRepository = new StateRepository();

export class OrderService {
    async createOrder(order: CreateOrderBody, idClient: number) {
        try {
            const client = await clientRepository.getClientById(idClient);

            if (!client.reservedTable) throw new Error('No puede efectuar un pedido sin reservar una mesa')

            let amountOfDishes = 0;
            let totalPrice = 0;
            for (const item of order) {
                const dish = await menuRepository.getDishById(item.idDish);
                amountOfDishes += item.amount;
                const price = dish.price;
                for (var i = 0; i < item.amount; i++) {
                    totalPrice += price;
                }
            }

            const address = client.address;
            const discountPercentage = await discountService.getDiscountPercentage(client.idClient);
            totalPrice -= totalPrice * (discountPercentage / 100)

            const newOrder = await orderRepository.createOrder(idClient, amountOfDishes, totalPrice, discountPercentage, address);

            const idOrder = newOrder.idOrder;
            for (const item of order) {
                const dish = await menuRepository.getDishById(item.idDish);
                const idDish = dish.idDish;
                const amount = item.amount;
                await orderDishesRepository.addDishToOrder(idOrder, idDish, amount)
            }

            return newOrder;
        } catch(error) {
            throw error;
        }
    }

    async checkOrderState(idOrder: number, role: string) {
        try {
            if (role == 'Client') throw new Error('Debe ser administrador para acceder a esta función');
            
            const order = await orderRepository.getOrder(idOrder);
            const state = await stateRepository.getState(order.idState);

            return state.state;
        } catch (error) {
            throw error;
        }
    }

    async updateOrderState(idOrder: number, idState: number, role: string) {
        try {
            if (role == 'Client') throw new Error('Debe ser administrador para acceder a esta función');

            const order = await orderRepository.changeOrderState(idOrder, idState);
        } catch(error) {
            throw error;
        }
    }

    async checkClientsOrdersState(idClient: number) {
        try {
            const orders = await orderRepository.getClientsOrders(idClient);
            
            const ordersState = await Promise.all(
            orders.map(async (order: any) => {
                const state = await stateRepository.getState(order.idState);
                return {
                    id: order.idOrder,
                    state: state.state
                };
            })
            );

            if (ordersState.length === 0) throw new Error('No tiene pedidos activos');

            return ordersState;
        } catch (error) {
            throw error;
        }
    }
}