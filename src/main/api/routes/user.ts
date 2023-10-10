import {Request, Response} from "express";

var express = require("express"),
    router = express.Router(),
    {
        signup,
        signin
    } = require("../controllers/authentication");

router.post("/register", signup, function (req: Request, res: Response) {

});

router.post("/login", signin, function (req: Request, res: Response) {

});

module.exports = router;