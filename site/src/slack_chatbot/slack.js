// const mysql = require('mysql2')

// var mySqlConfig = mysql.createConnection({
//     host: "localhost",
//     database: "PowerTechSolutions",
//     user: "aluno",
//     password: "sptech",
// });

// mySqlConfig.connect();

// const sqlInit= 'USE PowerTechSolutions'

// const sqlQuery= 'SELECT pergunta FROM Pergunta'

// mySqlConfig.query(sqlInit)

// mySqlConfig.query(sqlQuery, (error,results)=> {
//     if(error){
//         throw error;

//     }
//     const pgt_user= results[0].pergunta;

// });

// const { WebClient } = require('@slack/web-api');

// const token = 'xoxb-6242930515444-6239031019781-fTXwHjxVqaLe9c168ZZ3z6Uj';
// const web= new WebClient(token);

// web.chat.postMessage({
//     channel: `central_ajuda`,
//     text: `texto do banco: ${pgt_user}`
// })
// .then((res)=>{
//     console.log("Mensagem enviada com sucesso:", res.ts);
// })
// .catch(console.error);

// mySqlConfig.end();

const { WebClient } = require('@slack/web-api');

function enviarMensagem(mensagem) {
    // Slack API configuration
    const token = 'xoxb-6242930515444-6239031019781-WISzHTCofOFjupeERD5NqsaZ';
    const web = new WebClient(token);

    // Send message to Slack
    return web.chat.postMessage({
        channel: 'central_ajuda',
        text: `
            Solicitação de NomeUsuario: usuario\nTexto: ${mensagem}
        `,
    });

}

module.exports = {
    enviarMensagem
}
