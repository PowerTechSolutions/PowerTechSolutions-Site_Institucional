var database = require("../database/config");

function pegar_MF(FKUnidade){
    var instrucao = `
    SELECT 
    IDMaquina,
    Usuario_Dashboard.Nome as 'Nome',
    Maquinas.Apelido as 'apelido',
    Estado
    FROM Maquinas JOIN Tipo_maquina
        ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
    JOIN Estado_maquina
        ON IDEstado = FKEstado
    JOIN Usuario_Dashboard
        ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = 'FISICA'
        AND Usuario_Dashboard.FKUnidade = ${FKUnidade};
    `

    return database.executar(instrucao);
}

function pegar_MV(FKUnidade){
    var instrucao = `
    SELECT 
    IDMaquina,
    Usuario_Dashboard.Nome as 'Nome',
    Maquinas.Apelido as 'apelido',
    Estado
    FROM Maquinas JOIN Tipo_maquina
        ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
    JOIN Estado_maquina
        ON IDEstado = FKEstado
    JOIN Usuario_Dashboard
        ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
    WHERE Tipo_maquina.Apelido = 'VIRTUAL'
        AND Usuario_Dashboard.FKUnidade = ${FKUnidade};
    `

    return database.executar(instrucao);
}

function contar_MF_ativas(IDEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            Count(IDMaquina) as Contagem 
        FROM Maquinas JOIN Tipo_maquina
            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        JOIN Estado_maquina
            ON IDEstado = FKEstado
        JOIN Usuario_Dashboard
            ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
        WHERE Tipo_maquina.Apelido = "FISICA"
            AND Usuario_Dashboard.FKUnidade = ${IDEmpresa}
            AND Estado_maquina.Estado = "Ativa";`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contar_MF_inativas(IDEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            Count(IDMaquina) as Contagem 
        FROM Maquinas JOIN Tipo_maquina
            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        JOIN Estado_maquina
            ON IDEstado = FKEstado
        JOIN Usuario_Dashboard
            ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
        WHERE Tipo_maquina.Apelido = "FISICA"
            AND Usuario_Dashboard.FKUnidade = ${IDEmpresa}
            AND Estado_maquina.Estado = "Inativa";`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contar_MV_ativas(IDEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            Count(IDMaquina) as Contagem 
        FROM Maquinas JOIN Tipo_maquina
            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        JOIN Estado_maquina
            ON IDEstado = FKEstado
        JOIN Usuario_Dashboard
            ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
        WHERE Tipo_maquina.Apelido = "VIRTUAL"
            AND Usuario_Dashboard.FKUnidade = ${IDEmpresa}
            AND Estado_maquina.Estado = "Ativa";`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contar_MV_inativas(IDEmpresa) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            Count(IDMaquina) as Contagem 
        FROM Maquinas JOIN Tipo_maquina
            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        JOIN Estado_maquina
            ON IDEstado = FKEstado
        JOIN Usuario_Dashboard
            ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario 
        WHERE Tipo_maquina.Apelido = "VIRTUAL"
            AND Usuario_Dashboard.FKUnidade = ${IDEmpresa}
            AND Estado_maquina.Estado = "Inativa";`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pegar_MF,
    pegar_MV,
    contar_MF_ativas,
    contar_MF_inativas,
    contar_MV_ativas,
    contar_MV_inativas,
}