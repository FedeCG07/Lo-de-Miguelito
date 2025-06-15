import { Router } from "express"
import { login } from "../controllers/login"
import { logout } from "../controllers/logout"
import { register } from "../controllers/register"

export const clientRouter = Router()

clientRouter.get('/register', register);
clientRouter.get('/login', login)
clientRouter.get('/logout', logout)