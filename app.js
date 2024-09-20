import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./db/index.js";

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())


const PORT = process.env.PORT || 3000

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log("Server starts successfully...")
    })
})


// Router

import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"

app.use("/api", userRouter)
app.use("/api", productRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})


export default app;