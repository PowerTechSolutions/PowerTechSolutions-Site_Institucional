
var database = require("../database/config");

function acessarDesempenho() {

  instrucaoSql = `SELECT uso_ram AS ram, data_hora AS dataHora
  FROM Processos
  ORDER BY data_hora DESC
  LIMIT 10;
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertaCount() {
  instrucaoSql = `select COUNT(tipo_alerta) AS tipo_alerta from Alerta_Processo join Maquinas on
  fkMaquina= IDMaquina WHERE tipo_alerta= 2;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function criticoCount() {
  instrucaoSql = `select COUNT(tipo_alerta) AS tipo_alerta from Alerta_Processo join Maquinas on
  fkMaquina= IDMaquina WHERE tipo_alerta= 3;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function filtroAlerta() {
  instrucaoSql = `select IDMaquina, Apelido, nomeProcesso, uso_ram, tipo_alerta from Alerta_Processo join Maquinas on
  fkMaquina= IDMaquina WHERE tipo_alerta= 2 ORDER by data_hora DESC`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function filtroCritico() {
  instrucaoSql = `select IDMaquina, Apelido, nomeProcesso, uso_ram, tipo_alerta from Alerta_Processo join Maquinas on
  fkMaquina= IDMaquina WHERE tipo_alerta= 3 ORDER by data_hora DESC`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listagem() {
  instrucaoSql = `SELECT IDMaquina, Apelido, nomeProcesso ,ROUND(uso_ram, 2) AS Uso_ram
  FROM processos 
  JOIN maquinas ON fkMaquina = IDMaquina 
  ORDER BY data_hora DESC LIMIT 30`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  acessarDesempenho,
  alertaCount,
  criticoCount,
  filtroAlerta,
  filtroCritico,
  listagem
}
