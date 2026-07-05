import express from "express"
import morgan from "morgan";
import authRoute from "./router/auth.route.js";
const app = express()
app.use(express.json())

app.use('/api/v1/auth',authRoute)

    
app.get("/", (req, res) => {
  res.send("Hello, World!")
})

export default app