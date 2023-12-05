// function mandarSlack(){

//     var msg= document.getElementById("msg_send")

//     fetch("/slackbot/enviarMensagem", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             // crie um atributo que recebe o valor recuperado aqui
//             // Agora vá para o arquivo routes/usuario.js
//             msgServer: msg
//         })
//     }).then(function (resposta) {

//         console.log("resposta: ", resposta);

//         if (resposta.ok) {
//             // cardErro.style.display = "block";
//             // alert( `Cadastro realizado com sucesso! Redirecionando para tela de Login...`)
//             // mensagem_erro.innerHTML = `<span style="color: green;">Cadastro realizado com sucesso! Redirecionando para tela de Login...</span>`;
//             // login()

//             setTimeout(() => {
//                 // login()
//             }, "2000")
//         } else {
//             throw ("Houve um erro ao tentar enviar sua mensagemn!");
//         }
//     }).catch(function (resposta) {
//         console.log(`#ERRO: ${resposta}`);
//     });

//     return false;
// }