import axios from "axios";

const api = axios.create({
  baseURL: "https://nanny-services-back.vercel.app", // ✅ англійські букви!
  headers: { 
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true"
  }
});

const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  api.defaults.headers.common['Content-Type'] = 'application/json'; 
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};

export { setAuthHeader, clearAuthHeader };
export default api;