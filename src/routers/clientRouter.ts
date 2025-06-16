import { Router } from "express"
import { login } from "../controllers/login"
import { logout } from "../controllers/logout"
import { register } from "../controllers/register"

export const clientRouter = Router()

clientRouter.post('/register', register);
clientRouter.post('/login', login)
clientRouter.get('/logout', logout)