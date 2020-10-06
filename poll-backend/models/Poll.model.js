const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/User.model");

const OptionSchema = new Schema({
    option: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    voters: [String],
});

const PollSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    active: {
        type: Boolean,
        default: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [OptionSchema],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Poll = mongoose.model("poll", PollSchema);

module.exports = Poll;
