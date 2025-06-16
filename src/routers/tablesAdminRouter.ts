import { Router } from "express"
import { unreserveAdminTable } from "../controllers/unreserveAdminTable";

export const tablesAdminRouter = Router();

tablesAdminRouter.post('/unreserve/:id', unreserveAdminTable);
