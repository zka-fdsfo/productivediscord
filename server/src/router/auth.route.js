import { Router } from "express";
import { register, login ,logout,refresh} from "../controller/auth.controller.js";
import { verifyJwt,accessTokenverifyJwt } from "../middleware/auth.middleware.js";

const  authRoute = Router();

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/logout', verifyJwt, logout)
authRoute.get('/refresh', refresh)
authRoute.get('/accesstoken', accessTokenverifyJwt);

export default authRoute