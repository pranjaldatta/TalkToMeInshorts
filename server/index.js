var express = require('express')
var router = require("./router/routes")
var bodyparser = require("body-parser")

var app = express() 

var port = 8000

app.use(bodyparser.urlencoded({extended: false}))
app.listen(port ,function() {
    console.log("Server running at port : ", port)
})
app.use("/" , router)


module.exports = app