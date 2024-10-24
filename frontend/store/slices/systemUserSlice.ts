/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { getApi } from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSystemUsers = createAsyncThunk("systemUser/fetchSystemUsers", async () => {
    const response = await getApi().get("/user");
    return response.data;
});

export const createSystemUser = createAsyncThunk("systemUser/createSystemUser", async (payload: any, { rejectWithValue }) => {
    try {
        const response = await getApi().post("/user", payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
});
export interface ISystemUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
}
interface ISystemUserState {
    // data: ISystemUser[];
    data: any;
    loading: boolean;
    error: string | null;
    gridMode: boolean;
    systemUser: ISystemUser | undefined;
}
const initialState: ISystemUserState = {
    data: [],
    loading: false,
    error: null,
    gridMode: false,
    systemUser: undefined
};

const systemUserSlice = createSlice({
    name: "system-user",
    initialState,
    reducers: {
        toggleMode(state) {
            state.gridMode = !state.gridMode;
        },
    },
    extraReducers(builder) {
         //fetch system users
         builder.addCase(fetchSystemUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(fetchSystemUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch employees";
        }).addCase(fetchSystemUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })

        //create system user
        builder.addCase(createSystemUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createSystemUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to create employee";
        }).addCase(createSystemUser.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        })
    }
});

export const systemUserActions = systemUserSlice.actions;

export default systemUserSlice;