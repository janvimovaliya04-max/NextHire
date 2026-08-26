import axios from "axios";

const api = axios.create({
    baseURL: "https://6a8d2c78baf2ac84246ccb50.mockapi.io", // Replace with your backend API URL
});

export default api;