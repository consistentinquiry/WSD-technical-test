import {NextFunction, Request, Response} from "express";

const util = require('util');
const jwt = require('jsonwebtoken');
const verify = util.promisify(jwt.verify);

import {User} from "../models/user";
import {RequestUser} from "../../types/RequestUser";

export const verifyToken = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = await verify(token, process.env.API_SECRET);
            console.log("token: ", token);

            if (decoded) {
                const user = (await User.findOne({_id: decoded.id}).exec()).toObject();

                if (user) {
                    console.log("User in auth: ", user);
                    req.user = user;
                }
            }
        } else {
            req.user = undefined;
            return res.status(403).send({ message: "Invalid JWT token" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
};


module.exports = verifyToken;
