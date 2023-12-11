var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/estabilidade_REDE/:FKMaquina",function (req,res){
    redeController.estabilidade_REDE(req,res)
});

module.exports = router

