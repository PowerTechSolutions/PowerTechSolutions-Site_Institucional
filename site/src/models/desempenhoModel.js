var database = require("../database/config");

function acessarDesempenho(FKMAQUINA) {
  
  instrucaoSql = `SELECT ROUND(SUM(tempo_user) / 60, 2) AS tempo_em_minutos, nome, MAX(dthora_captura) 
    AS ultima_data_captura
    FROM processos 
    WHERE fkmaquina_processo = ${FKMAQUINA}
    GROUP BY nome, DATE(dthora_captura)
    ORDER BY ultima_data_captura DESC;`

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
