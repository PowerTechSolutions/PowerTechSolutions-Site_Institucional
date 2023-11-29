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

const mysql = require('mysql2');
const { WebClient } = require('@slack/web-api');

// MySQL configuration
const mySqlConfig = mysql.createConnection({
    host: "localhost",
    database: "PowerTechSolutions",
    user: "aluno",
    password: "sptech",
});

mySqlConfig.connect();

const sqlInit = 'USE PowerTechSolutions';
const sqlQuery = 'SELECT pergunta FROM Pergunta ORDER BY dtHora DESC;';

// Function to query MySQL
const queryMySQL = (query) => {
    return new Promise((resolve, reject) => {
        mySqlConfig.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Perform MySQL queries
queryMySQL(sqlInit)
    .then(() => queryMySQL(sqlQuery))
    .then((results) => {
        const pgt_user = results[0].pergunta;

        // Slack API configuration
        const token = ' ';
        const web = new WebClient(token);

        // Send message to Slack
        return web.chat.postMessage({
            channel: 'central_ajuda',
            text: `Solicitação de NomeUsuario: ${pgt_user}`,
        });
    })
    .then((res) => {
        console.log('Mensagem enviada com sucesso:', res.ts);
    })
    .catch((error) => {
        console.error('Erro:', error);
    })
    .finally(() => {
        mySqlConfig.end();
    });
