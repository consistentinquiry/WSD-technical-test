import {Request, Response} from "express";

var express = require("express"),
    router = express.Router(),
    {
        signup,
        signin
    } = require("../controllers/authentication");


router.post("/register", signup, function (req: Request, res: Response) { //TODO can I delete the params?

});

router.post("/login", signin, function (req: Request, res: Response) {

});

module.exports = router;