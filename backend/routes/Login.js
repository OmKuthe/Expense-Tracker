import  express  from "express";
const router=express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Users } from "../models/userModel.js";

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send({
                message: "Please Provide All Fields"
            });
        }

        const userExist = await Users.findOne({ email });
        if (!userExist) {
            return response.status(409).send({
                message: "User with given email does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return response.status(409).send({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            { userId: userExist._id, username: userExist.username },
            process.env.JWT_SECRET, 
            { expiresIn: "7d" }
        );

        return response.status(200).send({
            message: "Login Successful",
            token,
            userId:userExist._id 
        });

    } catch (error) {
        console.log("Error in Login");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

const login = router;
export default login;