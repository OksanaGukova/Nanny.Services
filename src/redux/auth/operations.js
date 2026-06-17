import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { clearAuthHeader, setAuthHeader } from "../../services/api";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", credentials);

      console.log("📝 Register response:", res.data);

      setAuthHeader(res.data.data.accessToken);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", { email, password });

      setAuthHeader(res.data.data.accessToken);

      return res.data.data; // ✅ ПОВЕРТАЄМО ВСЕ, включно з _id
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
      const res = await api.post("/auth/refresh");
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
      await api.post("/auth/logout");
      clearAuthHeader();
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getGoogleOAuthUrl = createAsyncThunk(
  'auth/getGoogleOAuthUrl',
  async (_, thunkAPI) => {
    try {
      console.log('📤 Fetching OAuth URL...');
      const res = await api.get('/auth/get-oauth-url');
      
      console.log('📥 Response:', res.data);
      console.log('📥 URL:', res.data.data.url);
      
      return res.data.data.url;
    } catch (error) {
      console.error('❌ Request failed:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const confirmGoogleAuth = createAsyncThunk(
  'auth/confirmGoogleAuth',
  async (_, thunkAPI) => {
    try {
      // Google вже перенаправив нас сюди з кодом
      // Бекенд вже обробив і повернув дані
      // Беремо дані з URL
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      
      if (!code) {
        throw new Error('No authorization code');
      }

      // Вже обробилось на бекенді, тепер просто отримуємо дані
      const res = await api.get(`/auth/confirm-google-auth?code=${code}`);
      
      return {
        accessToken: res.data.data.accessToken,
        user: res.data.data.user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);