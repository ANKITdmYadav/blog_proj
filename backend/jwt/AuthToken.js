import jwt from "jsonwebtoken"
import { User } from "../models/user_models.js"
import dotenv from "dotenv"


const createTokenAndSaveCookies=async(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        httpOnly:true, //hacker protect
        secure:true,
        sameSite:"strict"
    })
    await User.findByIdAndUpdate(userId,{token})
    return token
}

export default createTokenAndSaveCookies