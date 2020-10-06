const express = require("express");
const httpError = require("http-errors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PATCH', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true
}))
require("./db/connectMongo")();
require("./helpers/preparePassport")(app,MongoStore);

const PollRoutes = require("./routes/poll.routes");
const VoteRoutes = require("./routes/vote.routes");
const AuthRoutes = require("./routes/auth.routes");

app.use("/auth", AuthRoutes);
app.use("/vote", VoteRoutes);
app.use("/polls", PollRoutes);

app.use((req, res, next) => {
    next(httpError(404, "Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
    console.log("poll server running on port:" + PORT);
});
