function enviarMensagem(req) {
    var msg = req.body.msgVar;

    fetch("http://hooks.slack.com/services/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", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json"
        }
        ,
        body: JSON.stringify({
            text: msg
        })
    }).then((res) => {
        console.log(res);
    })
}

module.exports = {
    enviarMensagem,
}