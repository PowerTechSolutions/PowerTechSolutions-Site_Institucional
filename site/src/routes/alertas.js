var express = require("express");
var router = express.Router();

var alertaControler = require("../controllers/alertasController");

router.get("/geral_mf/:FKUnidade", function (req,res){
    alertaControler.geral_mf(req, res);
});

module.exports = router;