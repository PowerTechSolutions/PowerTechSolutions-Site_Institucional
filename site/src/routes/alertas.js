var express = require("express");
var router = express.Router();

var alertaControler = require("../controllers/alertasController");

router.get("/geral_mf/:FKUnidade", function (req,res){
    alertaControler.geral_mf(req, res);
});

router.post("/ultimas", function (req,res){
    alertaControler.log_alertas(req, res);
});

router.get("/tempo_real/:FKUnidade", function (req,res){
    alertaControler.tempo_real_log_alertas(req, res);
});
module.exports = router;