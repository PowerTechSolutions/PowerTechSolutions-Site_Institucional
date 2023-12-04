var database = require("../database/config");

function acessarDesempenho(id_user) {
  
  instrucaoSql = `SELECT ROUND(SUM(tempo_user) / 60, 2) AS tempo_em_minutos, processos.nome AS Nome_Processo, MAX(dthora_captura) 
  AS ultima_data_captura
  FROM processos 
  JOIN Maquinas ON fkmaquina_processo = IDMaquina 
 JOIN Usuario_Dashboard ON IDUsuario = FKFuncionario
  WHERE IDUsuario= ${id_user}
  GROUP BY processos.nome, DATE(dthora_captura)
  ORDER BY ultima_data_captura DESC;`

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// function getFKMAQUINA(FKUSER){
//   instrucaoSql= `SELECT IDMaquina FROM Maquinas WHERE FKFuncionario = 2`  

//   console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function kpiAlerta() {
    instrucaoSql = ``;
  
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
  }


module.exports = {
  acessarDesempenho,
  //getFKMAQUINA,
  kpiAlerta
}
