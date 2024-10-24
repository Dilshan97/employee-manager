/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./slices/authSlice";
import systemUserSlice from "./slices/systemUserSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["system-user"], // persist state
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    systemUser: systemUserSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
