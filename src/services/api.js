import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL || "https://ai-code-reviewer-backend-ysli.onrender.com//api"

});

export default api;