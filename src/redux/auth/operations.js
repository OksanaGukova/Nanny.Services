import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";
import { clearAuthHeader, setAuthHeader } from "../../services/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", credentials);
      console.log("📝 Register response:", res.data);
      setAuthHeader(res.data.data.accessToken);  // ✅ res.data.data.accessToken
      return res.data.data;  // ✅ повертаємо дані з data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {  // ✅ Отримуємо email
    try {
      const res = await axios.post("/auth/login", { email, password });
      setAuthHeader(res.data.data.accessToken);  
      return {
        accessToken: res.data.data.accessToken,
        user: { 
          name: res.data.data.user?.name || email.split('@')[0],  // ✅ Використовуємо email
          email: email 
        }
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }
    try {
      setAuthHeader(persistedToken);
      const res = await axios.post("/auth/refresh");
      console.log("🔄 Refresh response:", res.data);
      return res.data.data;  // ✅ повертаємо дані з data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axios.post("/auth/logout");
      clearAuthHeader();
      
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (key.startsWith('favorites_')) {
          console.log("🗑️ Clear favorites on logout:", key);
          localStorage.removeItem(key);
        }
      });
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);