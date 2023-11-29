var database = require("../database/config");

function geral_mf(FKUnidade){
    var instrucao = `
    

    
    `;

    return database.executar(instrucao)

}

function log_alertas(FKUnidade,mes) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(Alertas.IDAlerta) AS Alertas , date_format(Data_Hora, "%d/%c") as momento_grafico FROM Alertas WHERE FKUnidade_negocio = 1 GROUP BY Data_Hora;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT count(IDAlerta) as Alertas
        FROM Alertas JOIN Nivel_alerta
        ON IDNivel_alerta = FKNivel_alerta
        WHERE Data_Hora LIKE "%-${mes}-%" GROUP BY IDNivel_alerta;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempo_real_log_alertas(FKUnidade) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT Alertas.IDAlerta AS Alertas, date_format(Data_Hora, "%d/%c") as momento_grafico FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    geral_mf,
    log_alertas,
    tempo_real_log_alertas
}