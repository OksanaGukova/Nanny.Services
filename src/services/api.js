import axios from "axios";

// Базовий URL без /api (оскільки маршрути вже містять префікси)
 const api = axios.create({
  baseURL: "https://nanny-servies-back.vercel.app",
  headers: { "Content-Type": "application/json" }
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
