import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

export const fetchNannies = createAsyncThunk(
  "nannys/fetchNannies",
  async (params, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const page = params?.page || 1;
      
      // ✅ Отримуємо фільтри з state
const sort = state.nanniesFilters?.sort || '';
const priceFilter = state.nanniesFilters?.priceFilter || '';
const popularity = state.nanniesFilters?.popularity || '';

      // ✅ Будуємо query параметри
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('perPage', 10); // ✅ Ваш розмір сторінки
      
      // ✅ СОРТУВАННЯ
   if (sort === 'A to Z') {
        queryParams.append('sort', 'a-z');
      } else if (sort === 'Z to A') {
        queryParams.append('sort', 'z-a');
      }
      
      // ✅ ЦІНА
      if (priceFilter === 'Less than 10$') {
        queryParams.append('maxPrice', '10');
      } else if (priceFilter === 'Greater than 10$') {
        queryParams.append('minPrice', '10');
      }
      
      // ✅ ПОПУЛЯРНІСТЬ
      if (popularity === 'Popular') {
        queryParams.append('minRating', '4');
      } else if (popularity === 'Not popular') {
        queryParams.append('maxRating', '3');
      }
 console.log('🌐 URL:', queryParams.toString()); 
      const res = await axios.get(`/nannys?${queryParams.toString()}`);

      return {
        data: res.data.data.data,
        page: res.data.data.page,
        totalPages: res.data.data.totalPages,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchNannyById = createAsyncThunk(
  "nannys/fetchNannyById",
  async (nannyId, thunkAPI) => {
    try {
      const res = await axios.get(`/nannys/${nannyId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateNanny = createAsyncThunk(
  "nannys/updateNanny",
  async ({ nannyId, data }, thunkAPI) => {
    try {
      const res = await axios.patch(`/nannys/${nannyId}`, data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteNanny = createAsyncThunk(
  "nannys/deleteNanny",
  async (nannyId, thunkAPI) => {
    try {
      await axios.delete(`/nannys/${nannyId}`);
      return nannyId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createNanny = createAsyncThunk(
  "nannys/createNanny",
  async (nannyData, thunkAPI) => { 
    try {
      console.log("📤 SEND TO SERVER:", JSON.stringify(nannyData, null, 2));
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const res = await axios.post("/nannys", nannyData, config);
      console.log("✅ FULL RESPONSE:", JSON.stringify(res.data, null, 2));
      
      // ✅ ПОВЕРТАЄМО ПРАВИЛЬНО
      return res.data.data; 
    } catch (error) {
      console.log("❌ ERROR RESPONSE:", error.response?.data);
      
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const getGoogleOAuthUrl = createAsyncThunk(
  'auth/getGoogleOAuthUrl',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/auth/get-oauth-url');
      return res.data.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
