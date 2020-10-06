const mongoose = require("mongoose");
const Poll = require("../models/Poll.model");
const httpError = require("http-errors");
module.exports = {
    vote: async (req, res, next) => {
        const id = req.params.id;
        const { name, optionId } = req.body;
        try {
            const poll = await Poll.findById(id);
            if (!poll) {
                throw httpError(404, "Poll does not exists!");
            }

            if (!poll.active) {
                throw httpError(400, "Poll has ended");
            }
            const option = await poll.options.id(optionId);

            if (!option) {
                throw httpError(400, "Bad Request");
            }
            option.votes += 1;
            option.voters.push(name);
            const result = await poll.save();
            res.status(201).send("success");
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.CastError) {
                next(httpError(400, "Bad Request"));
                return;
            }
            next(error);
        }
    },
};
