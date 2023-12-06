var database = require("../database/config");

function acessarDesempenho(id_user) {
 
  instrucaoSql = `SELECT ROUND(SUM(uso_ram), 2) AS Ram_Utilizada, nomeProcesso AS Nome_Processo
  FROM Processos
  JOIN Maquinas ON fkMaquina = IDMaquina
  JOIN Usuario_Dashboard ON IDUsuario = FKFuncionario
  WHERE IDUsuario = ${id_user} AND nomeProcesso NOT IN ('tradingscreen.exe', 'energyquant.exe', 'bloombergbash.exe', 'eikon.exe', 'powermarket.exe', 'calypso.exe')
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


module.exports = {
  acessarDesempenho,
  kpiAlerta
}

