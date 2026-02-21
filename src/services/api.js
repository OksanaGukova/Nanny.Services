import axios from "axios";

// Базовий URL без /api (оскільки маршрути вже містять префікси)
axios.defaults.baseURL = "http://localhost:3000";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export { setAuthHeader, clearAuthHeader };
export default axios;