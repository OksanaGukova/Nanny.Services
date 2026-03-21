import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

export const fetchNannies = createAsyncThunk(
  "nannys/fetchNannies",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/nannys");
     return res.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
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
      const res = await axios.post("/nannys", nannyData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);