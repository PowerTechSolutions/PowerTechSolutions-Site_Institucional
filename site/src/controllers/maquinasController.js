var maquinaModel = require("../models/maquinasModel")

function pegar_MF(req,res){

    var FKUnidade = req.params.FKUnidade;

    maquinaModel.pegar_MF(FKUnidade).then(function (resultado){
        if(resultado.length>0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar maquinas fisicas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function pegar_MV(req,res){

    var FKUnidade = req.params.FKUnidade;

    maquinaModel.pegar_MV(FKUnidade).then(function (resultado){
        if(resultado.length>0){
            res.status(200).json(resultado);
        }else{
            res.status(204).send("Nenhum resultado encontrado!!");
        }
    }).catch(function (erro){
        console.log(erro);
        console.log("Houve um erro ao buscar maquinas fisicas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function contar_MF_ativas(req, res) {

    var IDEmpresa = req.params.IDEmpresaVar;

    maquinaModel.contar_MF_ativas(IDEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function contar_MF_inativas(req, res) {

    var IDEmpresa = req.params.IDEmpresaVar;

    maquinaModel.contar_MF_inativas(IDEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function contar_MV_ativas(req, res) {

    var IDEmpresa = req.params.IDEmpresaVar;

    maquinaModel.contar_MV_ativas(IDEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function contar_MV_inativas(req, res) {

    var IDEmpresa = req.params.IDEmpresaVar;

    maquinaModel.contar_MV_inativas(IDEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    pegar_MF,
    pegar_MV,
    contar_MF_ativas,
    contar_MF_inativas,
    contar_MV_ativas,
    contar_MV_inativas
}