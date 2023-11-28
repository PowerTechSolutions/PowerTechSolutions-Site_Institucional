var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController")

router.get("/pegar_MF/:FKUnidade", function (req,res){
    maquinasController.pegar_MF(req,res)
});

router.get("/pegar_MV/:FKUnidade", function (req,res){
    maquinasController.pegar_MV(req,res)
});

router.get("/contar_MF_ativas/:IDEmpresaVar", function (req,res){
    maquinasController.contar_MF_ativas(req,res);
});

router.get("/contar_MF_inativas/:IDEmpresaVar", function (req,res){
    maquinasController.contar_MF_inativas(req,res);
});

router.get("/contar_MV_ativas/:IDEmpresaVar", function (req,res){
    maquinasController.contar_MV_ativas(req,res);
});

router.get("/contar_MV_inativas/:IDEmpresaVar", function (req,res){
    maquinasController.contar_MV_inativas(req,res);
});

module.exports = router;