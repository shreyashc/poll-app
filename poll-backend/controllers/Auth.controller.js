const User = require("../models/User.model");
const mongoose = require("mongoose");
const httpError = require("http-errors");

module.exports = {
    signup: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const usernameTaken = await User.findOne({ username: username });
            if (usernameTaken) {
                throw httpError.Conflict("username is already taken");
            }
            const user = new User({ username, password });

            const result = await user.save();
            res.send("success");
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    message: "invalid username/password",
                });
            }
            const { id, username } = req.user;
            res.json({
                id,
                username,
            });
        } catch (error) {
            next(error);
        }
    },

    logout: (req, res, next) => {
        req.logout();
        res.status(200).send("success")
    },
};
