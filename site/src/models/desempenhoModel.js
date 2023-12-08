
var database = require("../database/config");

function acessarDesempenho() {

  instrucaoSql = `SELECT uso_ram AS ram, DATE_FORMAT(data_hora, '%d-%m-%Y') AS dataHora
  FROM Processos
  ORDER BY data_hora DESC
  LIMIT 30
  `

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function kpiAlerta() {
  instrucaoSql = ``;

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
  kpiAlerta,
  listagem
}
