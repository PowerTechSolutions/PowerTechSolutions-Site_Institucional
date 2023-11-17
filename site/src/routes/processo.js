var express = require("express");
var router = express.Router();

var processoController = require("../controllers/processoController");

router.get("/ExibirUltimosProcessos", function (req, res) {
  processoController.ExibirUltimosProcessos(req, res);
});

// router.post("/cadastrar", function (req, res) {
//   processoController.ExibirUltimosProcessos(req, res);
// })

module.exports = router;