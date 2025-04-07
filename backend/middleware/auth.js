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

    if (error.name === 'TokenExpiredError') {
      return response.status(401).json({ message: 'Token expired. Please login again.' });
    }
  
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ message: 'Invalid token' });
    }
  
    return response.status(401).json({ message: 'Please authenticate' });
  }
};

export default authenticate;