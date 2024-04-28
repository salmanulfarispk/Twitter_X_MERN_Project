import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config();
 const port=process.env.PORT
 import connectMongoDb from "./db/mongodbConnects.js"
 import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth',authRoutes)



app.listen(port,()=>{
    console.log("server running on ",port);
    connectMongoDb();
})

