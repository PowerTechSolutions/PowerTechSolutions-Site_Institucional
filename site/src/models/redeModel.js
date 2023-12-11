var database = require("../database/config");

function estabilidade_REDE(FKMAQUINA) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `
        SELECT COUNT(IDConexao) as estabilidade FROM Redes_conectadas WHERE FKMaquina = ${FKMAQUINA} AND Data_Hora_Conexao >= DATEADD(HOUR,-8,GETDATE());
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `
        SELECT COUNT(IDConexao) as estabilidade FROM Redes_conectadas WHERE FKMaquina = 1 AND Data_Hora_Conexao >= DATEADD(HOUR,-8,GETDATE());`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    estabilidade_REDE
}