import { API_BASE_URL } from "../utils/constants";
const axios = require("axios");
const instance = axios.create({
    // baseURL: "http://localhost:1337/",
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default instance;
