const express = require("express");
const router = express.Router();

const VoteController = require("../controllers/Vote.controller");

//@route /vote/

router.post("/:id", VoteController.vote);

module.exports = router;
