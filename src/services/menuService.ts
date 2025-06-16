import { MenuRepository } from "../repositories/menuRepository";
import { CategoryRepository } from "../repositories/categoryRepository";

interface CreateDishBody {
  name: string
  desc: string
  price: number
  idCategory: number
}

const menuRepository = new MenuRepository();
const categoryRepository = new CategoryRepository();

export class MenuService {
    async createDish(name: string, desc: string, price: number, idCategory: number, role: string) {
        try {
            if (role == 'Client') throw new Error('Debe ser administrador para acceder a esta función');

            const newDish = await menuRepository.createDish(name, desc, price, idCategory);

            return newDish;
        } catch (error) {
            throw error;
        }
    }

    async getAllDishes() {
        try {
            const dishes = await menuRepository.getAllDishes();

            const dishesDetails = await Promise.all(
            dishes.map(async (dish: any) => {
                const category = await categoryRepository.getCategory(dish.idCategory);
                return {
                    id: dish.idDish,
                    name: dish.name,
                    desc: dish.desc,
                    price: dish.price,
                    category: category.category,
                };
            })
            );

            dishesDetails.sort((a, b) => a.category.localeCompare(b.category));

            return dishesDetails;
        } catch (error) {
            throw error;
        }
    }

    async deleteDish(idDish: number, role: string) {
        try {
            if (role == 'Client') throw new Error('Debe ser administrador para acceder a esta función');

            const deletedDish = await menuRepository.deleteDish(idDish);
    
            return deletedDish;
        } catch (error) {
            throw error;
        }
    }
}