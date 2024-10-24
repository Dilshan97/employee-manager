/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import storage from "redux-persist/lib/storage";
import systemUserSlice from "./slices/systemUserSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["system-user"], // persist state
};

const persistedReducer = persistReducer(persistConfig, systemUserSlice.reducer);

export const store = configureStore({
    reducer: {
        systemUser: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for redux-persist
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
