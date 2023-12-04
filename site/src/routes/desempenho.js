var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/acessarDesempenho/:id_user", function (req, res) {
    desempenhoController.acessarDesempenho(req, res);
})

router.get("/kpiAlerta", function (req, res) {
    desempenhoController.kpiAlerta(req, res);
})

module.exports = router;