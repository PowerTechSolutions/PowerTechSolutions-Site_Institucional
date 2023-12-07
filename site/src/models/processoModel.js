


var database = require("../database/config");

function quantidadeEstavel() {

  instrucaoSql = `
  SELECT COUNT(*) as alertaVerde FROM Alerta_Processo WHERE tipo_alerta = 1;
`


  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function maquinaNumber() {

  instrucaoSql = `
  SELECT FKMaquina as qtdMaquina FROM Processos;
` 


  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function Exibir_Processos() {

  instrucaoSql = `
  SELECT data_hora, PID, nomeProcesso, cpu_processo, uso_ram,
  data_hora, fkMaquina, 
  DATE_FORMAT(data_hora, '%d/%m/%Y %H:%i:%s') as data_formatada
	FROM Processos 
	WHERE data_hora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
  ORDER BY data_hora DESC;
`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function ListarCriticos() {

  instrucaoSql = `
  SELECT data_hora, PID, nomeProcesso, cpu_processo, uso_ram, tipo_alerta
  FROM 
  Alerta_Processo 
  WHERE data_hora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
  ORDER BY data_hora DESC;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function plotarGrafico_picos(PID, fkMaquina) {

  instrucaoSql = `
  SELECT 
    DATE(data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DAYNAME(data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DAYNAME(data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DAYNAME(data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DAYNAME(data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DAYNAME(data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DAYNAME(data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DAYNAME(data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, fkMaquina, PID
FROM Processos 
WHERE fkMaquina = 1
GROUP BY DATE(data_hora), dia_semana, fkMaquina, PID;	
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function obterDadosGrafico_picos(PID, fkMaquina) {

  instrucaoSql = `
  SELECT 
    DATE(data_hora) AS data,
    MAX(cpu_processo) AS pico_CPU,
    MAX(uso_ram) AS pico_RAM,
    CASE 
        WHEN DAYNAME(data_hora) = 'Sunday' THEN 'Domingo'
        WHEN DAYNAME(data_hora) = 'Monday' THEN 'Segunda-feira'
        WHEN DAYNAME(data_hora) = 'Tuesday' THEN 'Terça-feira'
        WHEN DAYNAME(data_hora) = 'Wednesday' THEN 'Quarta-feira'
        WHEN DAYNAME(data_hora) = 'Thursday' THEN 'Quinta-feira'
        WHEN DAYNAME(data_hora) = 'Friday' THEN 'Sexta-feira'
        WHEN DAYNAME(data_hora) = 'Saturday' THEN 'Sábado'
    END as dia_semana, fkMaquina, PID
FROM Processos 
WHERE fkMaquina = 1
GROUP BY DATE(data_hora), dia_semana, fkMaquina, PID;;	
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function matarProcesso(pid) {

  instrucaoSql = `
  UPDATE Alerta_Processo
  SET encerrado = 1
  WHERE IDAlertaProcessos IN (
  SELECT IDAlertaProcessos FROM 
  (SELECT IDAlertaProcessos FROM Alerta_Processo WHERE PID = ${pid}) 
  AS subquery);
  
`
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  quantidadeEstavel,
  maquinaNumber,
  Exibir_Processos,
  ListarCriticos,
  plotarGrafico_picos,
  obterDadosGrafico_picos,
  matarProcesso
}
