import {Request, Response} from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User} from "../models/user";

export const signup = async (req: Request, res: Response) => {
    console.log("Creating user...");
    try {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            userType: req.body.userType,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        if(req.body.userType != "premium" && req.body.userType != "free") {
            console.error("User creation failed")
            return res.status(400).send({
                message: "The userType was invalid"
            });
        }


        const savedUser = await user.save();
        console.log("User created successfully");

        res.status(200).send({
            message: "User registered successfully",
            user: savedUser
        });
    } catch (err) {
        console.error("Error occurred during user creation:", err);

        // Check for MongoDB-specific error codes and handle them appropriately
        if (err.code === 11000) { // Duplicate key error
            return res.status(400).send({
                message: "Email address is already in use."
            });
        }
        if (req.body.fullName == null ||
            req.body.email == null ||
            req.body.userType == null ||
            req.body.password == null) {
            return res.status(400).send({
                message: "The user entity was invalid"
            });
        }
        res.status(500).send({
                message: "Internal server error"
        });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({email: req.body.email}).exec();

        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({id: user.id}, process.env.API_SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                userType: user.userType
            },
            message: "Login successful",
            accessToken: token,
        });
    } catch (err) {
        console.error("Login error, secret is: ", process.env.API_SECRET)
        res.status(500).send({message: err.message});
    }
};
