var database = require("../database/config");

function geral_mf(FKUnidade){
    var instrucao = `
    SELECT 
    COUNT(IDAlerta) as Alertas
        FROM Alertas JOIN Monitoramento_RAW 
        ON Alertas.FKMonitoramento = Monitoramento_RAW.IDMonitoramento
        JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
                ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
                    JOIN Maquinas 
                        ON FKMaquina = IDMaquina
                        JOIN Tipo_maquina 
                            ON IDTipo = FKTipo_maquina
                            JOIN Nivel_alerta
                                ON IDNivel_alerta = FKNivel_alerta
        WHERE Tipo_maquina.Apelido = 'FISICA' AND Alertas.FKUnidade_negocio = ${FKUnidade} GROUP BY IDNivel_alerta;
    `;
    return database.executar(instrucao)
}

function geral_vm(FKUnidade){
    var instrucao = `
    SELECT 
    COUNT(IDAlerta) as Alertas
        FROM Alertas JOIN Monitoramento_RAW 
        ON Alertas.FKMonitoramento = Monitoramento_RAW.IDMonitoramento
        JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
                ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
                    JOIN Maquinas 
                        ON FKMaquina = IDMaquina
                        JOIN Tipo_maquina 
                            ON IDTipo = FKTipo_maquina
                            JOIN Nivel_alerta
                                ON IDNivel_alerta = FKNivel_alerta
        WHERE Tipo_maquina.Apelido = 'VIRTUAL' AND Alertas.FKUnidade_negocio = ${FKUnidade} GROUP BY IDNivel_alerta;
    `;
    return database.executar(instrucao)
}

function log_alertas(FKUnidade,mes) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
            COUNT(IDAlerta) as Alertas
            FROM Alertas
            JOIN Nivel_alerta 
                ON IDNivel_alerta = FKNivel_alerta
            WHERE FORMAT(Data_Hora, '%M') = '${mes}' 
            GROUP BY IDNivel_alerta;`;

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
    geral_vm,
    log_alertas,
    tempo_real_log_alertas
}