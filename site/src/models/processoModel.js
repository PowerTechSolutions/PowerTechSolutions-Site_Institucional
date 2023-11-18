var database = require("../database/config");

function Exibir_Processos() {
  
  instrucaoSql = `SELECT * FROM Alerta_Processo WHERE data_hora >= date_sub(now(), interval 1 minute)`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  Exibir_Processos
}
