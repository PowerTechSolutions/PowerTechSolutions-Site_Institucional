var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/ExibirUltimosProcessos", function (req, res) {
  processoController.ExibirUltimosProcessos(req, res);
});

router.get("/ListarCriticos", function (req, res) {
  processoController.ListarCriticos(req, res);
});

router.get("/tempo-real_pico", function (req, res) {
  processoController.plotarGrafico_picos(req, res);
});

router.get("/obterdadospico", function (req, res) {
  processoController.obterDadosGrafico_picos(req, res);
});

module.exports = router;