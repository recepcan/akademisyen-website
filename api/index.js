import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authRoutes from './Routes/authRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app =express();

dotenv.config();
mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
console.log("mongodb connected")
})
.catch(err=>{
    console.log("db error",err)
})

app.use(express.json())
app.use(cookieParser())


app.use(cors({
    origin: 'http://localhost:5173', // Frontend'in çalıştığı port
    credentials: true, // Eğer yetkilendirme cookies kullanıyorsanız
  }));
app.use('/api/auth', authRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})




app.listen(process.env.PORT || 5000, () => {
    console.log("server is running on port  5000")
})