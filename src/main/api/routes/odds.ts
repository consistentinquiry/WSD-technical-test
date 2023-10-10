
var express = require("express"),
    router = express.Router(),
    {
        odds
    } = require("../controllers/odds"),
    verifyToken = require('../middleware/authJWT');

router.post('/odds', verifyToken, odds);

module.exports = router;