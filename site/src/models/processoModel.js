


var database = require("../database/config");

function quantidadeEstavel() {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
      SELECT COUNT(*) as alertaVerde FROM Alerta_Processo WHERE tipo_alerta <> 1;
      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
      SELECT COUNT(*) as alertaVerde FROM Alerta_Processo WHERE tipo_alerta <> 1;
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function maquinaNumber() {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
      SELECT FKMaquina FROM Processos;
      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
      SELECT FKMaquina FROM Processos;
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function Exibir_Processos() {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
SELECT 
    data_hora, 
    PID, 
    nomeProcesso, 
    cpu_processo, 
    uso_ram,
    fkMaquina, 
    CONVERT(VARCHAR, data_hora, 103) + ' ' + CONVERT(VARCHAR, data_hora, 108) as data_formatada
FROM 
    Processos 
WHERE 
    data_hora >= DATEADD(MINUTE, -1, GETDATE())
ORDER BY 
    data_hora DESC;
      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
SELECT 
    data_hora, 
    PID, 
    nomeProcesso, 
    cpu_processo, 
    uso_ram,
    fkMaquina, 
    CONVERT(VARCHAR, data_hora, 103) + ' ' + CONVERT(VARCHAR, data_hora, 108) as data_formatada
FROM 
    Processos 
WHERE 
    data_hora >= DATEADD(MINUTE, -1, GETDATE())
ORDER BY 
    data_hora DESC;

      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ListarCriticos() {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
SELECT 
    data_hora, 
    PID, 
    nomeProcesso, 
    cpu_processo, 
    uso_ram, 
    tipo_alerta
FROM 
    Alerta_Processo
WHERE 
    data_hora >= DATEADD(MINUTE, -1, GETDATE())
ORDER BY 
    data_hora DESC;

      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
SELECT 
    data_hora, 
    PID, 
    nomeProcesso, 
    cpu_processo, 
    uso_ram, 
    tipo_alerta
FROM 
    Alerta_Processo
WHERE 
    data_hora >= DATEADD(MINUTE, -1, GETDATE())
ORDER BY 
    data_hora DESC;

      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function plotarGrafico_picos(PID, fkMaquina) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
SELECT 
    CONVERT(DATE, data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, 
    fkMaquina, 
    PID
FROM 
    Processos 
WHERE 
    fkMaquina = 1
GROUP BY 
    CONVERT(DATE, data_hora), 
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END,
    fkMaquina, 
    PID;
      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
SELECT 
    CONVERT(DATE, data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, 
    fkMaquina, 
    PID
FROM 
    Processos 
WHERE 
    fkMaquina = 1
GROUP BY 
    CONVERT(DATE, data_hora), 
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END,
    fkMaquina, 
    PID;
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterDadosGrafico_picos(PID, fkMaquina) {

  instrucaoSql = ''

  if (process.env.AMBIENTE_PROCESSO == "producao") {
      instrucaoSql = `
SELECT 
    CONVERT(DATE, data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, 
    fkMaquina, 
    PID
FROM 
    Processos 
WHERE 
    fkMaquina = 1
GROUP BY 
    CONVERT(DATE, data_hora), 
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END,
    fkMaquina, 
    PID;
      `;

  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
      instrucaoSql = `
SELECT 
    CONVERT(DATE, data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, 
    fkMaquina, 
    PID
FROM 
    Processos 
WHERE 
    fkMaquina = 1
GROUP BY 
    CONVERT(DATE, data_hora), 
    CASE 
        WHEN DATENAME(WEEKDAY, data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DATENAME(WEEKDAY, data_hora) = 'Saturday' THEN 'Sábado'
    END,
    fkMaquina, 
    PID;
      `;
  } else {
      console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
      return
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


// function matarProcesso(pid) {

//   instrucaoSql = `
//   UPDATE Alerta_Processo
//   SET encerrado = 1
//   WHERE IDAlertaProcessos IN (
//   SELECT IDAlertaProcessos FROM 
//   (SELECT IDAlertaProcessos FROM Alerta_Processo WHERE PID = ${pid}) 
//   AS subquery);
  
// `
//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//   return database.executar(instrucaoSql);
// }

module.exports = {
  quantidadeEstavel,
  maquinaNumber,
  Exibir_Processos,
  ListarCriticos,
  plotarGrafico_picos,
  obterDadosGrafico_picos
}
