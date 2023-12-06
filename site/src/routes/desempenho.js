var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/acessarDesempenho", function (req, res) {
    desempenhoController.acessarDesempenho(req, res);
})

router.get("/kpiAlerta", function (req, res) {
    desempenhoController.kpiAlerta(req, res);
})

router.get("/listagem", function (req, res) {
    desempenhoController.listagem(req, res);
})

module.exports = router;
