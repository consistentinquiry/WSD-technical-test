import {Request, Response} from "express";
import {scrape} from "../../scraper/scraper";

var express = require("express"),
    router = express.Router(),
    {
        odds
    } = require("../controllers/odds"),
    verifyToken = require('../middleware/authJWT');

router.post('/odds', verifyToken, odds, async function (req: Request, res: Response) {

});

module.exports = router;