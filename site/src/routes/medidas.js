var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("log_alertas", function (req,res){
    medidaController.log_alertas(req, res);
})

router.get("tempo_real_log_alertas/:FKUnidade", function (req,res){
    medidaController.tempo_real_log_alertas(req, res);
})

module.exports = router;