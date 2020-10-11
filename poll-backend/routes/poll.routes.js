const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const PollController = require("../controllers/Poll.controller");

//@route /polls/

router.get("/", PollController.getAllPolls);

router.post("/", auth.isAuthenticated, PollController.createNewPoll);

router.get("/:id", PollController.findPollById);

router.delete("/:id", auth.isAuthenticated, PollController.deletePoll);

router.patch("/:id/end", auth.isAuthenticated, PollController.endPoll);

router.get(
    "/user/:userId",
    auth.isAuthenticated,
    PollController.findAllPollsByUserId
);

module.exports = router;
