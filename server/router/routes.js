var express = require("express")
var router= express.Router()
var pollyservice = require("../services/PollyService");


router.get("/" , function(req , res) {
    res.send("Hello World!")
})

router.get("/shorts" , function (req , res) {
    var category = req.query.category
    var num = req.query.num

    pollyservice.talkingShorts(category , num)
                .then(function(resp) {
                    res.send(resp)
                })
                .catch(function(err) {
                    res.send(err)
                })



})


module.exports = router;