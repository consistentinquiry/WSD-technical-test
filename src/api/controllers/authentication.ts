import {Request, Response} from "express";

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");

exports.signup = async (req: Request, res: Response) => {
    console.log("Creating user...");
    try {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            role: req.body.role,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        const savedUser = await user.save();

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

        res.status(500).send({
            message: "Internal server error"
        });
    }
};



exports.signin = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
            },
            message: "Login successful",
            accessToken: token,
        });
    } catch (err) {
        console.error("Login error, secret is: ", process.env.API_SECRET)
        res.status(500).send({ message: err.message });
    }
};
