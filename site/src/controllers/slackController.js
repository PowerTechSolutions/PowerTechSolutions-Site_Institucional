var chatModel = require("../models/chatModel")

function enviarMensagem(req,res) {
        // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
        var pergunta = req.body.msgServer;
    
        // Faça as validações dos valores
        if (pergunta == undefined) {
            res.status(400).send("Sua pergunta está undefined!");
        } else {
    
            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            chatModel.enviarMensagem(pergunta)
                .then(
                    function (resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }
    }


module.exports = {
    enviarMensagem,
}