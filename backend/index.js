import express from "express";
import dotenv from "dotenv"
import mongoose  from "mongoose";
import userRoute from './routes/user_routes.js'
import blogRoute from './routes/blog_route.js'
import aiRoute from './routes/ai_route.js'
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";
import {v2 as cloudinary} from 'cloudinary'
import cors from 'cors'

const app=express()

dotenv.config()

const port = process.env.PORT
const MONGO_URL=process.env.MONGO_URI

// sending data in form of json so use this middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:5174'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})



const connectDB = async () => {
    // use async await for mongo connection bcz return promise
    try {
      await mongoose.connect(MONGO_URL);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    }
  };
  
connectDB();

app.use('/api/users',userRoute)
app.use('/api/blogs',blogRoute)
app.use('/api/ai',aiRoute)


app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
    
})