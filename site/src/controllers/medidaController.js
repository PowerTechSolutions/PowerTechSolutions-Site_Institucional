var medidaModel = require("../models/medidaModel");

function log_alertas(req, res) {

    console.log(`Recuperando Quantidade de alertas`);

    medidaModel.log_alertas().then(function (resultado) {
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

    medidaModel.tempo_real_log_alertas(FKUnidade).then(function (resultado) {
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
    log_alertas,
    tempo_real_log_alertas
}