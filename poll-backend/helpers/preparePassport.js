const passport = require("passport");
const User = require("../models/User.model");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

module.exports = function (app,MongoStore) {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: { 
                maxAge: 1000 * 365 * 24 * 60 * 60 * 100,
                sameSite:"strict",
                // secure:true
                },
            store: new MongoStore({ mongooseConnection: mongoose.connection }),
        })
    );

    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        res.locals.user = req.user || null;
        next();
    });
    passport.use(
        new LocalStrategy(async function (username, password, done) {
            await User.findOne({ username: username }, async function (
                err,
                user
            ) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: "Incorrect username.",
                    });
                }
                const isValid = await user.validPassword(password);
                if (!isValid) {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
                return done(null, user);
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};
