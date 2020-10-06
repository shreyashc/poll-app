const express = require("express");
const router = express.Router();

const VoteController = require("../controllers/vote.controller");

//@route /vote/

router.post("/:id", VoteController.vote);

module.exports = router;
