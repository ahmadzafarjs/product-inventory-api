import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())


// Router

import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"

app.use("/api", userRouter)
app.use("/api", productRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})


export default app;