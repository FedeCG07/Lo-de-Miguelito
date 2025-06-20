import "dotenv/config"
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { clientRouter } from './routers/clientRouter';
import { menuRouter } from './routers/menuRouter';
import { tablesRouter } from './routers/tablesRouter';
import { orderRouter } from './routers/orderRouter';
import { orderAdminRouter } from './routers/orderAdminRouter';
import { tablesAdminRouter } from "./routers/tablesAdminRouter";

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/client', clientRouter)
app.use('/menu', menuRouter)
app.use('/tables', tablesRouter)
app.use('/order', orderRouter)
app.use('/orderadmin', orderAdminRouter)
app.use('/tablesadmin', tablesAdminRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ error: err.message || 'Internal Server Error' });
});

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})