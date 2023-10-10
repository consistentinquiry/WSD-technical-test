import bodyParser from 'body-parser';
//TODO sort out imports import or require?
const userRoutes = require("./routes/user");
const raceRoute = require("./routes/odds");
require('dotenv').config()

//TODO refactor to consts
var express = require('express');
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))
app.use(userRoutes);
app.use(raceRoute);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Bet scraper app listening at http://%s:%s", host, port)
})