const axios = require("axios");

const instance = axios.create({
    // baseURL: "http://localhost:1337/",
    // baseURL: "http://192.168.43.139:1337/",
    baseURL: "https://hc-poll.herokuapp.com/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
