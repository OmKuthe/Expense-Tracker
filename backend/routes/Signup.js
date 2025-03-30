import  express  from "express";
const router=express.Router();
import { Users } from "../models/userModel.js";

router.post('/signup', async (request, response) => {
    try {
        const { username, email, password } = request.body;
        if (!username || !email || !password) {
            return response.status(400).send({
                message: "Please Provide All Fields"
            });
        }

        const userExist = await Users.findOne({ email });
        if (userExist) {
            return response.status(409).send({
                message: "User with given email already exists"
            });
        }
        const newUser = new Users({
            username,
            email,
            password
        });

        await newUser.save();

        return response.status(201).send({
            message: "New User Created Successfully",
            user: {
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("Error in Signup");
        console.log(error);
        response.status(500).send({ message: "Internal Server Error" });
    }
});

const signup =router;
export default signup;