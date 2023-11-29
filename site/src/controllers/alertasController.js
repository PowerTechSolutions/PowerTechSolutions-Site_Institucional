var alertaModel = require("../models/alertasModel");

function geral_mf(req, res) {

    var FKUnidade = req.params.FKUnidade;

    console.log(`Recuperando Quantidade de alertas`);

    alertaModel.geral_mf(FKUnidade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function log_alertas(req, res) {

    var FKUnidade = req.body.FKUnidadeServer;
    var mes = req.body.mesServer;

    console.log(`Recuperando Quantidade de alertas`);

    alertaModel.log_alertas(FKUnidade, mes).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tempo_real_log_alertas(req, res) {

    var FKUnidade = req.params.FKUnidade;

    console.log(`Recuperando Quantidade de alertas`);

    alertaModel.tempo_real_log_alertas(FKUnidade).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    geral_mf,
    log_alertas,
    tempo_real_log_alertas
}