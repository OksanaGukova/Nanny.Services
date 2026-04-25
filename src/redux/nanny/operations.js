import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

/* export const fetchNannies = createAsyncThunk(
  "nannys/fetchNannies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/nannys");


      return res.data.data.data; // ✅ ФІКС
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
 */

export const fetchNannies = createAsyncThunk(
  "nannys/fetchNannies",
  async (page = 1, thunkAPI) => {
    try {
      const res = await axios.get(`/nannys?page=${page}`);

      // ✅ Повертаємо ВСЮ структуру з pagination
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

