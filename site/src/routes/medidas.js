var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/buscarDiscos/:FKMAQUINA", function (req,res){
    medidaController.buscarDiscos(req,res);
});

router.get("/buscarDiscosKaori/:FKMAQUINA", function (req,res){
    medidaController.buscarDiscosKaori(req,res);
});

router.get("/buscarTempoExecucao/:FKMAQUINA", function (req,res){
    medidaController.buscarTempoExecucao(req,res);
});

router.get("/buscarJanelas/:FKMAQUINA", function (req, res){
    medidaController.buscarJanelas(req,res);
});

router.get("/buscarTotal_Janelas/:FKMAQUINA", function (req,res){
    medidaController.buscarTotal_Janelas(req,res);
});

router.get("/atualizarFeedCountTem/:FKMAQUINA", function (req,res){
    medidaController.atualizarFeedCountTem(req,res);
});

router.get("/atualizarTotalTempo/:FKMAQUINA", function (req,res){
    medidaController.atualizarTotalTempo(req,res);
});

router.get("/atualizarNomeMaquina/:FKMAQUINA/:idUsuario", function (req,res){
    medidaController.atualizarNomeMaquina(req,res);
});

router.get("/ultimas_CPU/:FKMAQUINA", function (req,res){
    medidaController.ultimas_CPU(req,res);
});

router.get("/tempo-real_CPU/:FKMAQUINA", function (req,res){
    medidaController.tempo_real_CPU(req,res);
});

router.get("/ultimas_TempoExec/:FKMAQUINA", function (req,res){
    medidaController.ultimas_TempoExec(req,res);
});

router.get("/tempo_real_vmKaori/:FKMAQUINA", function (req,res){
    medidaController.tempo_real_vmKaori(req,res);
});


router.get("/ultimas_RAM/:FKMAQUINA", function (req,res){
    medidaController.ultimas_RAM(req,res);
});

router.get("/tempo-real_RAM/:FKMAQUINA", function (req,res){
    medidaController.tempo_real_RAM(req,res);
});

module.exports = router;