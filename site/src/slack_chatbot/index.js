const axios = require("axios");

axios.post(
    "https://hooks.slack.com/services/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",
    {
        //falta validar para enviar alertas
        text: "nada de helloworld"
    }
)
.then(response => {
    console.log("Resposta da requisição:", response.data);
})
.catch(error => {
    console.error("Erro na requisição:", error);
});
