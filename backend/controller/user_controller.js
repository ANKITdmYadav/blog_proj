import { User } from "../models/user_models.js";
import {v2 as cloudinary} from 'cloudinary'
import bcrypt from 'bcryptjs'
import createTokenAndSaveCookies from '../jwt/AuthToken.js'

export const register=async (req,res)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({message:"User photo is req"})
    }

    const {photo}=req.files
    const allowedFormats=["image/jpeg","image/png","image/webp"]
    if(!allowedFormats.includes(photo.mimetype)){
        return res.status(400).json({message:"Invalid photo format"})
    }
    

    const {email,name,password,phone,education,role}=req.body
    if(!email || !name || !password || !phone || !education || !role || !photo){
        return res.status(400).json({message:"Please fill required fields"})
    }

    const user=await User.findOne({email})
    if(user){
        return res
        .status(400)
        .json({message:"User already exist"})
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.log(cloudinaryResponse.error);
    }

    

    const hashedPassword=await bcrypt.hash(password,8)
    
    const newUser=new User({email,name,password:hashedPassword,phone,education,role,photo:{
        public_id:cloudinaryResponse.public_id,
        url:cloudinaryResponse.url
    }})

    await newUser.save()

    if(newUser){
        const token=await createTokenAndSaveCookies(newUser._id,res)
        res.status(201).json({message:"User registered successfully",newUser,token:token})
    }
}



export const login=async (req,res)=>{
    const {email,name,password,phone,education,role}=req.body
    try {
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const user=await User.findOne({email}).select("+password")
        if(!user.password){
            return res.status(400).json({message:"pswrd missing"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (user.role !== role) {
          return res.status(400).json({ message: `Given role ${role} not found` });
        }
        let token = await createTokenAndSaveCookies(user._id, res);
        console.log("Login: ", token);
        res.status(200).json({
          message: "User logged in successfully",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token: token,
        });
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server error"})
    }
}


export const logout=(req,res)=>{
    try {
        res.clearCookie("jwt",{httpOnly:true})
        res.status(200).json({message:"User logged Out successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "internal server error"})
        
    }    
}


export const getMyProfile=async(req,res)=>{
    // isAuthenticated will return req.user
    const user=await req.user
    res.status(200).json({user})
}

export const getAdmins=async (req,res)=>{
    const admins=await User.find({role:"admin"})
    res.status(200).json({admins})
}