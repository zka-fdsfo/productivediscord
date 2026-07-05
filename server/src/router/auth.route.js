import { Router } from "express";
import { register, login ,logout} from "../controller/auth.controller.js";

const  authRoute = Router();

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.get('/logout', logout)


export default authRoute