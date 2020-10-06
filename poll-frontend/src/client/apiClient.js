const axios = require("axios");

const instance = axios.create({
    baseURL: "http://localhost:1337/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
