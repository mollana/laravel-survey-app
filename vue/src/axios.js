import axios from "axios";
import store from "./store";

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

const axiosClient = axios.create({
    baseURL: `${baseURL}/api`
});

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient;