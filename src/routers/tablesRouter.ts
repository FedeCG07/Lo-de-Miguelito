import { Router } from "express"
import { availableTables } from "../controllers/availableTables"
import { reserveTable } from "../controllers/reserveTable";
import { unreserveTable } from "../controllers/unreserveTable";

export const tablesRouter = Router();

tablesRouter.get('/available', availableTables);
tablesRouter.post('/reserve/:id', reserveTable);
tablesRouter.post('/unreserve', unreserveTable);