function submit() {
    const respostaUser = document.getElementById("respostaUser").value;

    axios.post(
        "http://localhost:3000/slack-response",
        {
            text: respostaUser
        }
    )
    .then(response => {
        console.log("Resposta da requisição:", response.data);
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
    });
}


const respostaUser = process.argv[2];
console.log(`Resposta do usuário: ${respostaUser}`);

