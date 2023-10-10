var express = require("express"),
    router = express.Router(),
    {
        signup,
        signin
    } = require("../controllers/authentication");

router.post("/register", signup);

router.post("/login", signin);

module.exports = router;