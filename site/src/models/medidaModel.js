var database = require("../database/config");

function atualizarFeedCountTem(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
        COUNT(*) AS TotalCount
    FROM 
        Tempo_de_Execucao
    JOIN 
        maquinas ON Tempo_de_Execucao.FKTempo_maquina = maquinas.IDMaquina
    WHERE 
        maquinas.IDMaquina = ${FKMAQUINA}
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    COUNT(*) AS TotalCount
FROM 
    Tempo_de_Execucao
JOIN 
    maquinas ON Tempo_de_Execucao.FKTempo_maquina = maquinas.IDMaquina
WHERE 
    maquinas.IDMaquina = ${FKMAQUINA};`;
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
        DECLARE @TotalSegundos INT;
SELECT @TotalSegundos = SUM(DATEDIFF(SECOND, '00:00:00', Total_captura))
FROM tempo_de_execucao
WHERE FKTempo_maquina = ${FKMAQUINA};

-- Converte de volta para o formato TIME
DECLARE @SomaTotal TIME;
SET @SomaTotal = DATEADD(SECOND, @TotalSegundos, '00:00:00');

-- Exibe o resultado
SELECT @SomaTotal AS Total_Tempo;
        `;
    //     SELECT 
    //     SUM(Total_captura) AS Total_Tempo
    // FROM 
    //     tempo_de_execucao
    // JOIN 
    //     maquinas ON tempo_de_execucao.FKTempo_maquina = maquinas.IDMaquina
    // WHERE 
    //     maquinas.IDMaquina = ${FKMAQUINA};
//         DECLARE @TotalSegundos INT;
// SELECT @TotalSegundos = SUM(DATEDIFF(SECOND, '00:00:00', Total_captura))
// FROM tempo_de_execucao
// WHERE FKTempo_maquina = @FKMAQUINA;

// -- Converte de volta para o formato TIME
// DECLARE @SomaTotal TIME;
// SET @SomaTotal = DATEADD(SECOND, @TotalSegundos, '00:00:00');

// -- Exibe o resultado
// SELECT @SomaTotal AS Total_Tempo;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
    SUM(Total_captura) AS Total_Tempo
FROM 
    tempo_de_execucao
JOIN 
    maquinas ON tempo_de_execucao.FKTempo_maquina = maquinas.IDMaquina
WHERE 
    maquinas.IDMaquina = ${FKMAQUINA};
`;
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
        SELECT 
        Maquinas.Apelido AS Nome
    FROM 
        Maquinas
    JOIN 
        Usuario_Dashboard ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario
    WHERE 
        Usuario_Dashboard.IDUsuario = ${ID_USUARIO}
        AND Maquinas.IDMaquina = ${FKMAQUINA};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        Maquinas.Apelido AS Nome
    FROM 
        Maquinas
    JOIN 
        Usuario_Dashboard ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario
    WHERE 
        Usuario_Dashboard.IDUsuario = ${ID_USUARIO}
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
        SELECT top 1
	    Componentes_monitorados.IDComponente_monitorado as IDMonitoramento,
	    FORMAT(Data_Hora_Captura, 'dd/MM/yyyy') AS DataCaptura,
        Porcentagem AS "Uso_DIsco",
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
		    ORDER BY Monitoramento_RAW.IDMonitoramento asc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
	    Componentes_monitorados.IDComponente_monitorado as IDMonitoramento,
	    Data_Hora_Captura,
        Uso AS "Uso_DIsco",
        Porcentagem AS Porcentagem_Uso,
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

function buscarDiscosKaori(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT TOP 1
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
    JOIN Componentes_cadastrados ON Componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado
    JOIN Maquinas ON FKMaquina = IDMaquina
    WHERE 
        FKMaquina = ${FKMAQUINA}
        AND Componentes_cadastrados.Apelido = 'DISCO'
    ORDER BY 
        Monitoramento_RAW.IDMonitoramento DESC;  
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT TOP 1
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
    Monitoramento_RAW.IDMonitoramento DESC;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegar_janelas(FKUnidade) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT DISTINCT Maquinas.IDMaquina as id,(SELECT COUNT(idRegistro) FROM Henry) AS QTD, FORMAT(Data_Hora,'%d/%M/%y') as DataHora 
        FROM Henry JOIN Maquinas 
            ON Henry.FKMaquina = Maquinas.IDMaquina 
                JOIN Usuario_Dashboard 
                    ON Maquinas.FKFuncionario = Usuario_Dashboard.IDUsuario
                        JOIN Tipo_maquina
                            ON Maquinas.FKTipo_maquina = Tipo_maquina.IDTipo
        where FKUnidade = ${FKUnidade}
        AND Tipo_maquina.Apelido = 'FISICA';`;

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

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT
        IDTempo,
        FORMAT(Data_Hora, 'dd/MM/yyyy') AS 'Data',
        FORMAT(Data_Hora, 'HH:mm:ss') AS 'Hora',
        Total_captura AS total
    FROM
        Tempo_de_Execucao 
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    ORDER BY
        Data_Hora DESC;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT
    IDTempo,                                                                                            
    FORMAT(Data_Hora, 'dd/MM/yyyy') AS Data,
    FORMAT(Data_Hora, 'HH:mm:ss') AS Hora,
    FORMAT(Total_captura, 'HH:mm:ss') AS total
FROM
    Tempo_de_Execucao 
WHERE 
    FKTempo_maquina = ${FKMAQUINA}
ORDER BY
    Data_Hora DESC;
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
        SELECT Nome_Janelas as Nome,Data_Hora_Conexao as data 
        FROM Janelas_Abertas JOIN maquinas on FKMaquina = IDMaquina 
        WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ''
        AND Data_Hora_Conexao >= DATEADD(MINUTE,-1,GETDATE());`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT Nome_Janelas as Nome,Data_Hora_Conexao as data 
        FROM Janelas_Abertas JOIN maquinas on FKMaquina = IDMaquina 
        WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ""
        AND Data_Hora_Conexao >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);
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
        SELECT count(Nome_Janelas) as Total From Janelas_Abertas WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ''
        AND Data_Hora_Conexao >= DATEADD(MINUTE,-1,GETDATE());
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT count(Nome_Janelas) as Total From Janelas_Abertas WHERE FKMaquina = ${IDMaquina} AND Janelas_Abertas.Nome_Janelas != ""
AND Data_Hora_Conexao >= DATE_SUB(NOW(), INTERVAL 1 MINUTE);
    `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function estabilidadeCPU(IDMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT TOP 1 Porcentagem as Porcentagem_USO FROM monitoramento_raw JOIN componentes_monitorados 
        ON FKComponente_Monitorado = IDComponente_monitorado JOIN Componentes_cadastrados 
        ON componentes_monitorados.FKComponente_cadastrado = IDComponente_cadastrado JOIN maquinas ON FKMaquina = IDMaquina 
        WHERE IDComponente_cadastrado = 1 AND FKMaquina = ${IDMaquina} ORDER BY Monitoramento_RAW.IDMonitoramento DESC;        
    `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT Porcentagem as Porcentagem_USO FROM monitoramento_raw JOIN componentes_monitorados 
        ON FKComponente_Monitorado = IDComponente_monitorado JOIN Componentes_cadastrados 
        ON FKComponente_cadastrado = IDComponente_cadastrado JOIN maquinas ON FKMaquina = IDMaquina 
        WHERE IDComponente_cadastrado = 1 AND FKMaquina = ${IDMaquina} ORDER BY Monitoramento_RAW.IDMonitoramento DESC
LIMIT 1;`;
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
            DATE_FORMAT(Data_Hora_Captura,'%H:%i:%s') as momento_grafico,
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

function henry_RAM(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT TOP 10 Uso_Ram,Janela FROM Henry WHERE FKMaquina = ${FKMAQUINA} ORDER BY Uso_Ram DESC;`;

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



function ultimas_TempoExec(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = ` 
        SELECT TOP 7
    FORMAT(Data_Hora, 'dd/MM/yyyy') AS DiaDaSemana,
    CONVERT(INT, SUM(DATEDIFF(MINUTE, '00:00:00', Total_captura))) AS QuantidadeDesligamentos
FROM 
    Tempo_de_Execucao
WHERE 
    FKTempo_maquina = 
GROUP BY 
    FORMAT(Data_Hora, 'dd/MM/yyyy'), FORMAT(Data_Hora, 'yyyy/MM/dd')
ORDER BY 
    FORMAT(Data_Hora, 'yyyy/MM/dd');
    `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        FORMAT(Data_Hora, 'dd/MM/yyyy') AS DiaDaSemana,
        COUNT(Total_captura) AS QuantidadeDesligamentos
    FROM 
        Tempo_de_Execucao
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    GROUP BY 
        FORMAT(Data_Hora, 'dd/MM/yyyy')
    ORDER BY 
        DiaDaSemana DESC
    OFFSET 0 ROWS
    FETCH NEXT 7 ROWS ONLY; `;
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
        SELECT TOP 7
    FORMAT(Data_Hora, 'dd/MM/yyyy') AS DiaDaSemana,
    CONVERT(INT, SUM(DATEDIFF(MINUTE, '00:00:00', Total_captura))) AS QuantidadeDesligamentos
FROM 
    Tempo_de_Execucao
WHERE 
    FKTempo_maquina = ${FKMAQUINA}
GROUP BY 
    FORMAT(Data_Hora, 'dd/MM/yyyy'), FORMAT(Data_Hora, 'yyyy/MM/dd')
ORDER BY 
    FORMAT(Data_Hora, 'yyyy/MM/dd');

        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT DATE_FORMAT(Data_Hora, '%d/%m/%Y') AS DiaDaSemana, COUNT(Total_captura) AS QuantidadeDesligamentos
        FROM Tempo_de_Execucao
        WHERE FKTempo_maquina = ${FKMAQUINA}
        GROUP BY DiaDaSemana
        ORDER BY DiaDaSemana DESC
        LIMIT 7;
        
        
`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimas_TempoExecMonth(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT TOP 12
        CASE 
            WHEN MONTH(Data_Hora) = 1 THEN 'Janeiro'
            WHEN MONTH(Data_Hora) = 2 THEN 'Fevereiro'
            WHEN MONTH(Data_Hora) = 3 THEN 'Março'
            WHEN MONTH(Data_Hora) = 4 THEN 'Abril'
            WHEN MONTH(Data_Hora) = 5 THEN 'Maio'
            WHEN MONTH(Data_Hora) = 6 THEN 'Junho'
            WHEN MONTH(Data_Hora) = 7 THEN 'Julho'
            WHEN MONTH(Data_Hora) = 8 THEN 'Agosto'
            WHEN MONTH(Data_Hora) = 9 THEN 'Setembro'
            WHEN MONTH(Data_Hora) = 10 THEN 'Outubro'
            WHEN MONTH(Data_Hora) = 11 THEN 'Novembro'
            WHEN MONTH(Data_Hora) = 12 THEN 'Dezembro'
        END AS Mes,
        CONVERT(INT, SUM(DATEDIFF(MINUTE, '00:00:00', Total_captura))) AS QuantidadeDesligamentos
    FROM 
        Tempo_de_Execucao
    JOIN 
        Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    GROUP BY 
        MONTH(Data_Hora)
    ORDER BY 
        Mes DESC; 
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        CASE 
            WHEN MONTH(Data_Hora) = 1 THEN 'Janeiro'
            WHEN MONTH(Data_Hora) = 2 THEN 'Fevereiro'
            WHEN MONTH(Data_Hora) = 3 THEN 'Março'
            WHEN MONTH(Data_Hora) = 4 THEN 'Abril'
            WHEN MONTH(Data_Hora) = 5 THEN 'Maio'
            WHEN MONTH(Data_Hora) = 6 THEN 'Junho'
            WHEN MONTH(Data_Hora) = 7 THEN 'Julho'
            WHEN MONTH(Data_Hora) = 8 THEN 'Agosto'
            WHEN MONTH(Data_Hora) = 9 THEN 'Setembro'
            WHEN MONTH(Data_Hora) = 10 THEN 'Outubro'
            WHEN MONTH(Data_Hora) = 11 THEN 'Novembro'
            WHEN MONTH(Data_Hora) = 12 THEN 'Dezembro'
        END AS Mes,
        COUNT(*) AS QuantidadeDesligamentos
    FROM 
        Tempo_de_Execucao
    JOIN 
        Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    GROUP BY 
        Mes
    ORDER BY 
        Mes DESC
    LIMIT 12; -- Limite de 12 meses`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function tempo_real_vmKaori2(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT TOP 12
        CASE 
            WHEN MONTH(Data_Hora) = 1 THEN 'Janeiro'
            WHEN MONTH(Data_Hora) = 2 THEN 'Fevereiro'
            WHEN MONTH(Data_Hora) = 3 THEN 'Março'
            WHEN MONTH(Data_Hora) = 4 THEN 'Abril'
            WHEN MONTH(Data_Hora) = 5 THEN 'Maio'
            WHEN MONTH(Data_Hora) = 6 THEN 'Junho'
            WHEN MONTH(Data_Hora) = 7 THEN 'Julho'
            WHEN MONTH(Data_Hora) = 8 THEN 'Agosto'
            WHEN MONTH(Data_Hora) = 9 THEN 'Setembro'
            WHEN MONTH(Data_Hora) = 10 THEN 'Outubro'
            WHEN MONTH(Data_Hora) = 11 THEN 'Novembro'
            WHEN MONTH(Data_Hora) = 12 THEN 'Dezembro'
        END AS Mes,
        CONVERT(INT, SUM(DATEDIFF(MINUTE, '00:00:00', Total_captura))) AS QuantidadeDesligamentos
    FROM 
        Tempo_de_Execucao
    JOIN 
        Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    GROUP BY 
        MONTH(Data_Hora)
    ORDER BY 
        Mes DESC;
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT 
        CASE 
            WHEN MONTH(Data_Hora) = 1 THEN 'Janeiro'
            WHEN MONTH(Data_Hora) = 2 THEN 'Fevereiro'
            WHEN MONTH(Data_Hora) = 3 THEN 'Março'
            WHEN MONTH(Data_Hora) = 4 THEN 'Abril'
            WHEN MONTH(Data_Hora) = 5 THEN 'Maio'
            WHEN MONTH(Data_Hora) = 6 THEN 'Junho'
            WHEN MONTH(Data_Hora) = 7 THEN 'Julho'
            WHEN MONTH(Data_Hora) = 8 THEN 'Agosto'
            WHEN MONTH(Data_Hora) = 9 THEN 'Setembro'
            WHEN MONTH(Data_Hora) = 10 THEN 'Outubro'
            WHEN MONTH(Data_Hora) = 11 THEN 'Novembro'
            WHEN MONTH(Data_Hora) = 12 THEN 'Dezembro'
        END AS Mes,
        COUNT(*) AS QuantidadeDesligamentos
    FROM 
        Tempo_de_Execucao
    JOIN 
        Maquinas ON Tempo_de_Execucao.FKTempo_maquina = Maquinas.IDMaquina
    WHERE 
        FKTempo_maquina = ${FKMAQUINA}
    GROUP BY 
        Mes
    ORDER BY 
        Mes DESC
    LIMIT 12; -- Limite de 12 meses
    
`;
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
    tempo_real_vmKaori,
    ultimas_TempoExecMonth,
    tempo_real_vmKaori2,
    estabilidadeCPU,
    pegar_janelas,
    henry_RAM
}
