const { WebClient } = require('@slack/web-api');

function enviarMensagem(mensagem) {
    // Slack API configuration
    const token = '';
    // REMOVER TOKEN ANTES DE SUBIR NO GITHUB
    const web = new WebClient(token);

    // Send message to Slack
    return web.chat.postMessage({
        channel: 'powertech-chamados',
        text: `
            Solicitação de NomeUsuario: usuario\nTexto: ${mensagem}
        `,
    });

}

module.exports = {
    enviarMensagem
}
