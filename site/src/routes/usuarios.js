var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrando", function (req, res) {
    usuarioController.cadastrando(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/listar_usuarios", function (req, res) {
    usuarioController.listar_usuarios(req, res);
});

router.post("/buscarInfo", function (req, res) {
    usuarioController.buscarInfo(req, res);
});

router.get("/listar_maquinas/:IDFuncionario", function (req, res){
    usuarioController.listar_maquinas(req,res);
});

module.exports = router;