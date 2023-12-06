var database = require("../database/config");

function acessarDesempenho(id_user) {

  instrucaoSql = `SELECT ROUND(SUM(uso_ram), 2) AS Ram_Utilizada, COUNT(nomeProcesso) AS Nome_Processo
  FROM Processos
  JOIN Maquinas ON fkMaquina = IDMaquina
  JOIN Usuario_Dashboard ON IDUsuario = FKFuncionario
  WHERE IDUsuario = ${id_user}
  GROUP BY Nome_Processo
  ORDER BY data_hora DESC
  LIMIT 30;
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
  instrucaoSql = `SELECT IDMaquina, Apelido, ROUND(uso_ram, 2) AS Uso_ram
  FROM processos 
  JOIN maquinas ON fkMaquina = IDMaquina 
  GROUP BY IDMaquina, Apelido, ROUND(uso_ram, 2)`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  acessarDesempenho,
  kpiAlerta,
  listagem
}

