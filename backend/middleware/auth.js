import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";

const authenticate = async (request, response, next) => {
  try {
    const token = request.header("Authorization")?.replace('Bearer ', '');
    
    if (!token) {
      return response.status(401).json({ message: "Authentication required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await Users.findOne({ _id: decoded.userId }).select('-password');
    
    if (!user) {
      return response.status(401).json({ message: "User not found" });
    }
    request.user = user; 
    request.token = token;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return response.status(401).json({ 
      message: error.name === 'JsonWebTokenError' 
        ? "Invalid token" 
        : "Please authenticate"
    });
  }
};

export default authenticate;