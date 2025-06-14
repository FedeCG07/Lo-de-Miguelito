import { MenuRepository } from "../repositories/menuRepository";
import { CategoryRepository } from "../repositories/categoryRepository";

interface CreateMenuBody {
  name: string
  desc: string
  price: number
  idCategory: number
}

const menuRepository = new MenuRepository();
const categoryRepository = new CategoryRepository();

export class MenuService {
    async createDish(name: string, desc: string, price: number, idCategory: number) {
        try {
            const newDish = await menuRepository.createDish(name, desc, price, idCategory);

            return newDish;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async getAllDishes() {
        try {
            const dishes = await menuRepository.getAllDishes();

            for (const dish of dishes) {
                const category = await categoryRepository.getCategory(dish.idCategory);
                dish.category = category; //durisimo y completamente ilegal
                //desestructurar y armar objeto nuevo con nombre de categoría para devolver??
            }

            return dishes;
        } catch (error) {
            throw new Error('Base de datos ultra bug');
        }
    }

    async deleteDish(idDish: number) {
        try {
            const deletedDish = await menuRepository.deleteDish(idDish);
    
            return deletedDish;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}