import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const protect=async (req,res,next)=>{
    let token = req.headers.authorization; // Extract JWT from the 'Authorization' header

    
    try {
        token= token.slice(7)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        let user= await User.findOne({_id: decoded._id})
        req.user= user;
        next();

    } catch (error) {

        console.error('JWT verification error:', error);
        res.status(400).json({message: "Access denied."});
      }
}