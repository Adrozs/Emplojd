import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "create-account",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/create-account", user);
      console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  }
);
export const loginUser = createAsyncThunk("login", async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post("/login", user);
    console.log(resp);
  } catch (error) {
    console.log(error.response);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
