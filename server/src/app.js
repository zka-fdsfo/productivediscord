import express from "express"
import morgan from "morgan";
import authRoute from "./router/auth.route.js";
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser);

app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true 
}))
app.use('/api/v1/auth',authRoute)

    
app.get("/", (req, res) => {
  res.send("Hello, World!")
})

export default app