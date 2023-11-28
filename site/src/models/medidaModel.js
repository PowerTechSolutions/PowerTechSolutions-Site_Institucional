var database = require("../database/config");

function atualizarFeedCountTem(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    COUNT(*) AS TotalCount
FROM Tempo_de_Execucao
JOIN maquinas ON FKTempo_maquina = IDMaquina
WHERE maquinas.IDMaquina = ${FKMAQUINA};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarTotalTempo(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT SUM(Total_captura) AS Total_Tempo
FROM tempo_de_execucao
JOIN maquinas ON FKTempo_maquina = IDMaquina
WHERE maquinas.IDMaquina = ${FKMAQUINA};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarNomeMaquina(FKMAQUINA, ID_USUARIO) {
    var instrucaoSql = '';

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta FROM Alertas WHERE FKUnidade_negocio = ${FKMAQUINA}
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
            SELECT Maquinas.Apelido AS Nome
            FROM Maquinas
            JOIN Usuario_Dashboard ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario
            WHERE Usuario_Dashboard.IDUsuario = ${ID_USUARIO}
              AND Maquinas.IDMaquina = ${FKMAQUINA};
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDiscos(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
	    Componentes_monitorados.IDComponente_monitorado as IDMonitoramento,
	    Data_Hora_Captura,
        Uso AS "Uso_DIsco",
        Componentes_cadastrados.Apelido 
        FROM 
		    Monitoramento_RAW JOIN Componentes_monitorados 
		    ON FKComponente_Monitorado = IDComponente_monitorado 
		    JOIN Componentes_cadastrados 
		    ON FKComponente_cadastrado = IDComponente_cadastrado
		    JOIN Maquinas 
		    ON FKMaquina = IDMaquina
		    WHERE FKMaquina = ${FKMAQUINA}
		    AND Componentes_cadastrados.Apelido = "DISCO"
		    ORDER BY Monitoramento_RAW.IDMonitoramento DESC;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDiscosKaori(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
    Componentes_monitorados.IDComponente_monitorado AS IDMonitoramento,
    Data_Hora_Captura,
    ROUND((Total / POWER(1024, 3)), 2) AS Total_Uso,
	ROUND((Free / POWER(1024, 3)), 2) AS Livre_Uso, 
	ROUND((Uso / POWER(1024, 3)), 2) AS Uso_Disco,
    Porcentagem AS Porcentagem_Uso,
    Componentes_cadastrados.Apelido 
FROM 
    Monitoramento_RAW 
JOIN Componentes_monitorados ON FKComponente_Monitorado = IDComponente_monitorado 
JOIN Componentes_cadastrados ON FKComponente_cadastrado = IDComponente_cadastrado
JOIN Maquinas ON FKMaquina = IDMaquina
WHERE 
    FKMaquina = ${FKMAQUINA}
    AND Componentes_cadastrados.Apelido = 'DISCO'
ORDER BY 
    Monitoramento_RAW.IDMonitoramento DESC
LIMIT 1;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarTempoExecucao(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT DISTINCT
    DATE_FORMAT(Data_Hora, '%d/%m/%Y') AS Data,
    TIME(Data_Hora) AS Hora,
    TIME(Total_captura) AS total
FROM 
    Tempo_de_Execucao
JOIN 
    maquinas ON Tempo_de_Execucao.FKTempo_maquina = maquinas.IDMaquina
WHERE 
    FKTempo_maquina = ${FKMAQUINA};
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarJanelas(IDMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT Nome_Janelas as Nome,Data_Hora_Conexao as data 
        FROM Janelas_Abertas JOIN maquinas on FKMaquina = IDMaquina 
        WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ""
        AND Data_Hora_Conexao >= DATE_SUB(NOW(), INTERVAL 5 MINUTE);
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTotal_Janelas(IDMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT count(Nome_Janelas) as Total From Janelas_Abertas WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ""
AND Data_Hora_Conexao >= DATE_SUB(NOW(), INTERVAL 5 MINUTE);
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function ultimas_CPU(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            DATE_FORMAT(Data_Hora_Captura,'%H:%i') as momento_grafico,
            Uso AS Uso_CPU
            FROM 
		        Monitoramento_RAW JOIN Componentes_monitorados 
		        ON FKComponente_Monitorado = IDComponente_monitorado 
		        JOIN Componentes_cadastrados 
		        ON FKComponente_cadastrado = IDComponente_cadastrado
		        JOIN Maquinas 
		        ON FKMaquina = IDMaquina
		        WHERE FKMaquina = ${FKMAQUINA}
		        AND Componentes_cadastrados.Apelido = "CPU"
                ORDER BY Monitoramento_RAW.IDMonitoramento DESC 
                LIMIT 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempo_real_CPU(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        DATE_FORMAT(Data_Hora_Captura,'%H:%i') as momento_grafico,
        Uso AS Uso_CPU
            FROM 
		        Monitoramento_RAW JOIN Componentes_monitorados 
		        ON FKComponente_Monitorado = IDComponente_monitorado 
		        JOIN Componentes_cadastrados 
		        ON FKComponente_cadastrado = IDComponente_cadastrado
		        JOIN Maquinas 
		        ON FKMaquina = IDMaquina
		        WHERE FKMaquina = ${FKMAQUINA}
		        AND Componentes_cadastrados.Apelido = "CPU"
                ORDER BY Monitoramento_RAW.IDMonitoramento DESC 
                LIMIT 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimas_RAM(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
            DATE_FORMAT(Data_Hora_Captura,'%H:%i') as momento_grafico,
            Uso AS Uso_RAM
            FROM 
		        Monitoramento_RAW JOIN Componentes_monitorados 
		        ON FKComponente_Monitorado = IDComponente_monitorado 
		        JOIN Componentes_cadastrados 
		        ON FKComponente_cadastrado = IDComponente_cadastrado
		        JOIN Maquinas 
		        ON FKMaquina = IDMaquina
		        WHERE FKMaquina = ${FKMAQUINA}
		        AND Componentes_cadastrados.Apelido = "RAM"
                ORDER BY Monitoramento_RAW.IDMonitoramento DESC 
                LIMIT 10;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempo_real_RAM(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        DATE_FORMAT(Data_Hora_Captura,'%H:%i') as momento_grafico,
        Uso AS Uso_RAM
            FROM 
		        Monitoramento_RAW JOIN Componentes_monitorados 
		        ON FKComponente_Monitorado = IDComponente_monitorado 
		        JOIN Componentes_cadastrados 
		        ON FKComponente_cadastrado = IDComponente_cadastrado
		        JOIN Maquinas 
		        ON FKMaquina = IDMaquina
		        WHERE FKMaquina = ${FKMAQUINA}
		        AND Componentes_cadastrados.Apelido = "RAM"
                ORDER BY Monitoramento_RAW.IDMonitoramento DESC 
                LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function ultimas_TempoExec(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
    DAYNAME(Data_Hora) AS DiaDaSemana,
    COUNT(*) AS QuantidadeDesligamentos
FROM 
    Tempo_de_Execucao
JOIN 
    Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
WHERE 
    FKTempo_maquina = ${FKMAQUINA}
GROUP BY 
    DiaDaSemana
ORDER BY 
    DiaDaSemana ASC
LIMIT 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempo_real_vmKaori(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
    DAYNAME(Data_Hora) AS DiaDaSemana,
    COUNT(*) AS QuantidadeDesligamentos
FROM 
    Tempo_de_Execucao
JOIN 
    Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
WHERE 
    FKTempo_maquina = ${FKMAQUINA}
GROUP BY 
    DiaDaSemana
ORDER BY 
    DiaDaSemana ASC
LIMIT 7;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
    tempo_real_vmKaori
}
