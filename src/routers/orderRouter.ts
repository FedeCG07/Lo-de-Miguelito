import { Router } from "express"
import { createOrder } from "../controllers/createOrder";
import { checkState } from "../controllers/checkState";
import { updateState } from "../controllers/updateState";

export const orderRouter = Router();

orderRouter.post('/create', createOrder);
orderRouter.get('/state', checkState);
orderRouter.post('/update', updateState);