import axios from "axios";

const api = axios.create({
    baseURL: "https://6a70580555c0ce38c326306b.mockapi.io",
});

export default api;