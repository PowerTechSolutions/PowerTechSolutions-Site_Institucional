var desempenhoModel = require("../models/desempenhoModel");

function acessarDesempenho(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    desempenhoModel.acessarDesempenho(FKMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function kpiAlerta(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    desempenhoModel.kpiAlerta(FKMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    acessarDesempenho,
    kpiAlerta
}