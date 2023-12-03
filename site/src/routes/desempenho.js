var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/getFK", function (req, res) {
    desempenhoController.getFK(req, res);
})

router.get("/acessarDesempenho/:FKMAQUINA", function (req, res) {
    desempenhoController.acessarDesempenho(req, res);
})

router.get("/kpiAlerta/:FKMAQUINA", function (req, res) {
    desempenhoController.kpiAlerta(req, res);
})

module.exports = router;