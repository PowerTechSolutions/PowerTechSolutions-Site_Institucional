var desempenhoModel = require("../models/desempenhoModel");

function acessarDesempenho(req, res) {

    var id_user = req.params.id_user;

    desempenhoModel.acessarDesempenho(id_user)
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

// function getFKMAQUINA(req,res){

//     var FKUSER= req.body.idUserServer;

//     desempenhoModel.getFKMAQUINA(FKUSER)
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado)
//             } else {
//                 res.status(204).send("Nenhum resultado encontrado!")
//             }
//         }).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );

// }

function kpiAlerta(req, res) {

    // var idMaquinas = req.body.idMaquinas;

    desempenhoModel.kpiAlerta()
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
    // getFKMAQUINA,
    kpiAlerta
}