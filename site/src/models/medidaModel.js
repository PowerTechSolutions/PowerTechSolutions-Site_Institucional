var database = require("../database/config");

function log_alertas(FKUnidade,mes) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(Alerta) as Alertas
        FROM Alertas JOIN Nivel_alerta
        ON IDNivel_alerta = FKNivel_alerta
        WHERE CONVERT(varchar,Data_Hora,120) LIKE '%-${mes}-%';
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

function buscarDiscos(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
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
		    ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
		    JOIN Maquinas 
		    ON FKMaquina = IDMaquina
		    WHERE FKMaquina = ${FKMAQUINA}
		    AND Componentes_cadastrados.Apelido = 'DISCO'
		    ORDER BY Monitoramento_RAW.IDMonitoramento DESC;
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
		    ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
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


function buscarTempoExecucao(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
        DATE_FORMAT(Data_Hora, '%d/%m/%Y') AS Data,
        TIME(Data_Hora) AS Hora,
        TIME(Total_captura) AS total
       FROM Tempo_de_Execucao
       JOIN maquinas ON FKTempo_maquina = ${FKMAQUINA};
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarJanelas(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT Nome_Janelas as Nome FROM Janelas_Abertas JOIN maquinas on FKMaquina = IDMaquina WHERE IDMaquina = ${FKMAQUINA} AND Janelas_Abertas.Nome_Janelas IS NOT NULL;
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTotal_Janelas(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
            SELECT Alertas.IDAlerta AS Alertas FROM Alertas WHERE FKUnidade_negocio = ${FKUnidade} 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT count(Nome_Janelas) as Total From Janelas_Abertas WHERE FKMaquina = ${FKMAQUINA};
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
        SELECT TOP 10
        FORMAT(Data_Hora_Captura,'%H:%m:%s') as 'momento_grafico',
        Uso AS 'Uso_CPU'
        FROM 
            Monitoramento_RAW JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
            ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
            JOIN Maquinas 
            ON FKMaquina = IDMaquina
            WHERE FKMaquina = ${FKMAQUINA}
            AND Componentes_cadastrados.Apelido = 'CPU'
            ORDER BY Monitoramento_RAW.IDMonitoramento DESC; 
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
        SELECT TOP 1
        FORMAT(Data_Hora_Captura,'%H:%m:%s') as 'momento_grafico',
        Uso AS 'Uso_CPU'
        FROM 
            Monitoramento_RAW JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
            ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
            JOIN Maquinas 
            ON FKMaquina = IDMaquina
            WHERE FKMaquina = ${FKMAQUINA}
            AND Componentes_cadastrados.Apelido = 'CPU'
            ORDER BY Monitoramento_RAW.IDMonitoramento DESC; 
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
                LIMIT 1;`;
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
        SELECT TOP 10
        FORMAT(Data_Hora_Captura,'%H:%m:%s') as 'momento_grafico',
        Uso AS 'Uso_RAM'
        FROM 
            Monitoramento_RAW JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
            ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
            JOIN Maquinas 
            ON FKMaquina = IDMaquina
            WHERE FKMaquina = ${FKMAQUINA}
            AND Componentes_cadastrados.Apelido = 'RAM'
            ORDER BY Monitoramento_RAW.IDMonitoramento DESC;
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
        SELECT TOP 1
        FORMAT(Data_Hora_Captura,'%H:%m:%s') as 'momento_grafico',
        Uso AS 'Uso_RAM'
        FROM 
            Monitoramento_RAW JOIN Componentes_monitorados 
            ON FKComponente_Monitorado = IDComponente_monitorado 
            JOIN Componentes_cadastrados 
            ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
            JOIN Maquinas 
            ON FKMaquina = IDMaquina
            WHERE FKMaquina = ${FKMAQUINA}
            AND Componentes_cadastrados.Apelido = 'CPU'
            ORDER BY Monitoramento_RAW.IDMonitoramento DESC;`;

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
    log_alertas,
    tempo_real_log_alertas,
    buscarDiscos,
    ultimas_CPU,
    tempo_real_CPU,
    ultimas_RAM,
    tempo_real_RAM,
    contar_MF_ativas,
    contar_MF_inativas,
    contar_MV_ativas,
    contar_MV_inativas,
    buscarTempoExecucao,
    atualizarFeedCountTem, 
    buscarJanelas,
    buscarTotal_Janelas
}
