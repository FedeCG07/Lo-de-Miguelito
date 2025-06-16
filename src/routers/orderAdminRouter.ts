import { Router } from "express"
import { updateState } from "../controllers/updateState";
import { checkAdminState } from "../controllers/checkAdminState";

export const orderAdminRouter = Router();

orderAdminRouter.patch('/update/:id', updateState);
orderAdminRouter.get('/state/:id', checkAdminState);