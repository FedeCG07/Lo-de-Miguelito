import { Router } from "express"
import { avaibleTables } from "../controllers/avaibleTables"
import { reserveTable } from "../controllers/reserveTable";
import { unreserveTable } from "../controllers/unreserveTable";

export const tablesRouter = Router();

tablesRouter.get('/avaible', avaibleTables);
tablesRouter.post('/reserve/:id', reserveTable);
tablesRouter.post('/unreserve', unreserveTable);