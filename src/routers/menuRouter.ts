import { Router } from "express"
import { dishes } from "../controllers/dishes"
import { createDish } from "../controllers/createDish"
import { deleteDish } from "../controllers/deleteDish"

export const menuRouter = Router()

menuRouter.get('/', dishes);
menuRouter.post('/create', createDish);
menuRouter.delete('/delete/:id', deleteDish)