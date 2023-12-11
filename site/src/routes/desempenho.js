var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/acessarDesempenho", function (req, res) {
    desempenhoController.acessarDesempenho(req, res);
})

router.get("/alertaCount", function (req, res) {
    desempenhoController.alertaCount(req, res);
})

router.get("/criticoCount", function (req, res) {
    desempenhoController.criticoCount(req, res);
})

router.get("/filtroCritico", function (req, res) {
    desempenhoController.filtroCritico(req, res);
})

router.get("/filtroAlerta", function (req, res) {
    desempenhoController.filtroAlerta(req, res);
})

router.get("/listagem", function (req, res) {
    desempenhoController.listagem(req, res);
})

module.exports = router;
