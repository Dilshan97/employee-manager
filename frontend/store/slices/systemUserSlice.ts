/*
*   Copyright (c) 2024 Dilshan Ramesh
*   All rights reserved.
*/
import { createSlice } from "@reduxjs/toolkit";

export interface ISystemUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
}
interface ISystemUserState {
    data: ISystemUser[];
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
    }
});

export const systemUserActions = systemUserSlice.actions;

export default systemUserSlice;