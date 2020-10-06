const mongoose = require("mongoose");

module.exports = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("db connected");
        })
        .catch((err) => {
            console.log(err.message);
        });

    mongoose.connection.on("connected", () => {
        console.log("mongoose connected");
    });

    mongoose.connection.on("error", (err) => {
        console.log(err.message);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongoose disconnecting...");
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(() => {
            console.log("gracefully disconnected from db. ");
            process.exit(0);
        });
    });
};
