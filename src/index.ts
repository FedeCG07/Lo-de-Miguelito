import "dotenv/config"
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import cookieParser from 'cookie-parser';
import { clientRouter } from './routers/clientRouter';

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/client', clientRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message || 'Internal Server Error' });
});

app.listen(8000, () => {
  console.log(`App listening on http://localhost:8000`)
})