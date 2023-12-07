var medidaModel = require("../models/medidaModel");

function buscarDiscos(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.buscarDiscos(FKMAQUINA).then(function (resultado) {
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

function buscarDiscosKaori(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.buscarDiscosKaori(FKMAQUINA).then(function (resultado) {
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

function pegar_janelas(req, res) {

    var FKUnidade = req.params.FKUnidade;

    var idMaquina = 0

    medidaModel.pegar_janelas(FKUnidade,idMaquina).then(function (resultado) {
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

function buscarTempoExecucao(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.buscarTempoExecucao(FKMAQUINA).then(function (resultado) {
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

function buscarJanelas(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;


    medidaModel.buscarJanelas(FKMAQUINA).then(function (resultado) {
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

function buscarTotal_Janelas(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.buscarTotal_Janelas(FKMAQUINA).then(function (resultado) {
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

function atualizarFeedCountTem(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.atualizarFeedCountTem(FKMAQUINA).then(function (resultado) {
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

function estabilidadeCPU(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.estabilidadeCPU(FKMAQUINA).then(function (resultado) {
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

function atualizarTotalTempo(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.atualizarTotalTempo(FKMAQUINA).then(function (resultado) {
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


function atualizarNomeMaquina(req, res) {
    var ID_USUARIO = req.params.idUsuario;
    var FKMAQUINA = req.params.FKMAQUINA;
    console.log("debug", ID_USUARIO)

    medidaModel.atualizarNomeMaquina(FKMAQUINA, ID_USUARIO).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function ultimas_CPU(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.ultimas_CPU(FKMAQUINA).then(function (resultado) {
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

function tempo_real_CPU(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.tempo_real_CPU(FKMAQUINA).then(function (resultado) {
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

function ultimas_RAM(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.ultimas_RAM(FKMAQUINA).then(function (resultado) {
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

function henry_RAM(req, res) {

    medidaModel.henry_RAM().then(function (resultado) {
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

function tempo_real_RAM(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.tempo_real_RAM(FKMAQUINA).then(function (resultado) {
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

function contar_MF_ativas(req, res) {

    var IDEmpresa = req.params.IDEmpresaVar;

    medidaModel.contar_MF_ativas(IDEmpresa).then(function (resultado) {
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

    medidaModel.contar_MF_inativas(IDEmpresa).then(function (resultado) {
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

    medidaModel.contar_MV_ativas(IDEmpresa).then(function (resultado) {
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

    medidaModel.contar_MV_inativas(IDEmpresa).then(function (resultado) {
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



function ultimas_TempoExec(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.ultimas_TempoExec(FKMAQUINA).then(function (resultado) {
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

function tempo_real_vmKaori(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.tempo_real_vmKaori(FKMAQUINA).then(function (resultado) {
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


function ultimas_TempoExecMonth(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.ultimas_TempoExecMonth(FKMAQUINA).then(function (resultado) {
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

function tempo_real_vmKaori2(req, res) {

    var FKMAQUINA = req.params.FKMAQUINA;

    medidaModel.tempo_real_vmKaori2(FKMAQUINA).then(function (resultado) {
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
    buscarDiscos,
    ultimas_CPU,
    tempo_real_CPU,
    ultimas_RAM,
    tempo_real_RAM,
    buscarTempoExecucao,
    atualizarFeedCountTem, 
    buscarJanelas,
    atualizarNomeMaquina,
    buscarTotal_Janelas,
    buscarDiscosKaori,
    atualizarTotalTempo, 
    ultimas_TempoExec,
    tempo_real_vmKaori, 
    ultimas_TempoExecMonth,
    tempo_real_vmKaori2, 
    estabilidadeCPU,
    pegar_janelas,
    henry_RAM
}