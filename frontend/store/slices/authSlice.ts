/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import { getApi } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("auth/login", async (payload: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await getApi().post("/auth/login", payload);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async ({ rejectWithValue }: any) => {
  try {
    const response = await getApi().post("/auth/logout");
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export interface IAuthState {
  user: any | undefined;
  accessToken: string | undefined;
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: undefined,
  accessToken: undefined,
  data: undefined,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
      
      //login 
      builder.addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      }).addCase(login.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.loading = false;
        // state.user = user;
        state.accessToken = payload.accessToken;
      })

      //logout
      builder.addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      }).addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = undefined;
        state.accessToken = undefined;
      })
  },
});

export const authActions = authSlice.actions;

export default authSlice;
