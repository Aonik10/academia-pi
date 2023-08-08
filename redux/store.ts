"use client";

import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/toastSlice";
import modalReducer from "./features/modalSlice";
import purchaseSlice from "./features/purchaseSlice";

export const store = configureStore({
    reducer: {
        toast: toastReducer,
        modal: modalReducer,
        purchase: purchaseSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
