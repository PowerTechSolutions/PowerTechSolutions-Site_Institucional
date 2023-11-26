function enviarMensagem(req) {
    var msg = req.body.msgVar;

    fetch("http://hooks.slack.com/services/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", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: msg
       

    }).then((res) => {
        console.log(res);
    })
}

module.exports = {
    enviarMensagem,
}