import {NextFunction, Request, Response} from "express";

const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify);

const User = require("../models/user");

//TODO typescript this
const verifyToken = async (req: Request, res: Response, next: any) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await verify(token, process.env.API_SECRET);
            console.log("token: ", token);

            if (decoded) {
                const user = await User.findOne({ _id: decoded.id }).exec();
                if (user) {
                    console.log("User in auth: ", user);
                    //@ts-ignore
                    req.user = user;
                }
            }
        } else {
            //@ts-ignore
            req.user = undefined;
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};


module.exports = verifyToken; //TODO should I be doing this everywhere?
