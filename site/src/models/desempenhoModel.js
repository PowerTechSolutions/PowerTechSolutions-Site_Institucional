var database = require("../database/config");

function acessarDesempenho(id_user) {
  
  instrucaoSql = `SELECT ROUND(SUM(tempo_user) / 60, 2) AS tempo_em_minutos, Processos.nome AS Nome_Processo
  FROM Processos
  JOIN Maquinas ON fkmaquina_processo = IDMaquina
  JOIN Usuario_Dashboard ON IDUsuario = FKFuncionario
  WHERE IDUsuario = ${id_user}
  GROUP BY Nome_Processo
  ORDER BY tempo_em_minutos DESC
  LIMIT 10;`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function totalDesempenhoSetor(id_user){
  instrucaoSql= `SELECT ROUND(SUM(tempo_user) / 60, 2) AS Tempo_desempenho_total FROM Processos
  JOIN Maquinas ON fkmaquina_processo = IDMaquina
  JOIN Usuario_Dashboard ON IDUsuario = FKFuncionario
  WHERE IDUsuario = ${id_user};`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);

  return database.executar(instrucaoSql);
}

function programasPrincipais(){
  instrucaoSql= `SELECT ROUND(SUM(tempo_user) / 60, 2) AS Processos_Principais FROM Processos WHERE Processos.nome 
  IN ('tradingscreen.exe', 'energyquant.exe', 'bloombergbash.exe', 'eikon.exe', 'powermarket.exe', 'calypso.exe');`

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
  totalDesempenhoSetor,
  programasPrincipais,
  kpiAlerta
}
