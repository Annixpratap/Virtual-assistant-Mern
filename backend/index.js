import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import UserRouter from "./routes/user.routes.js";
dotenv.config();
console.log("PORT from .env:", process.env.PORT);

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",UserRouter)



app.listen(port , () =>{
    connectDB();
    console.log("server started");
    
})