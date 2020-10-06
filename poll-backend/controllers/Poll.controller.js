const mongoose = require("mongoose");
const httpError = require("http-errors");
const Poll = require("../models/Poll.model");
const User = require("../models/User.model");

module.exports = {
    getAllPolls: async (req, res, next) => {
        try {
            const polls = await Poll.find({})
                .populate("owner", "username")
                .lean();
            res.send(polls);
        } catch (err) {
            console.log(err.message);
        }
    },

    createNewPoll: async (req, res, next) => {
        try {
            req.body.owner = req.user.id;
            const poll = new Poll(req.body);
            const result = await poll.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if (error.name === "ValidationError") {
                next(httpError(422, error.message));
                return;
            }
            next();
        }
    },
    endPoll: async (req, res, next) => {
        try {
            let poll = await Poll.findById(req.params.id);

            if (!poll) {
                throw httpError(404, "poll does not exists");
            }
            if (poll.owner != req.user.id) {
                throw httpError(401, "Permission Denied");
            }

            poll.active = false;
            const result = await poll.save();
            res.send(result);
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(httpError(400, "Bad Request"));
                return;
            }
            next(error);
        }
    },
    deletePoll: async (req, res, next) => {
        const id = req.params.id;
        try {
            let poll = await Poll.findById(req.params.id);

            if (!poll) {
                throw httpError(404, "poll does not exists");
            }
            if (poll.owner != req.user.id) {
                throw httpError(401, "Permission Denied");
            }
            const result = await Poll.deleteOne(poll);

            res.send(result);
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(httpError(400, "Bad Request"));
                return;
            }
            next(error);
        }
    },

    findPollById: async (req, res, next) => {
        const id = req.params.id;
        try {
            const poll = await Poll.findById(id);
            if (!poll) {
                throw httpError(404, "Poll does not exists!");
            }
            res.send(poll);
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(httpError(400, "Bad Request"));
                return;
            }
            next(error);
        }
    },
    findAllPollsByUserId: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const polls = await Poll.find({
                owner: userId,
            })
                .sort({ createdAt: "desc" })
                .lean();
            res.send(polls);
        } catch (error) {
            if (error instanceof mongoose.CastError) {
                next(httpError(400, "Bad Request"));
                return;
            }
            next(error);
        }
    },
};
