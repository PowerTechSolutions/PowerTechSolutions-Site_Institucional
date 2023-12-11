var express = require("express");
var router = express.Router();
var slackController = require("../controllers/slackController");

router.post("/enviarMensagem", function (req, res) {
    slackController.enviarMensagem(req, res);
});

module.exports = router;