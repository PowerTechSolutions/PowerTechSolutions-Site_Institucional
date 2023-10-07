var express = require("express");
var router = express.Router();

var feedbacksController = require("../controllers/feedbacksControler");

router.post("/cadastrarFeedbacks", function (req, res) {
    feedbacksController.cadastrarFeedbacks(req, res);
})

module.exports = router;