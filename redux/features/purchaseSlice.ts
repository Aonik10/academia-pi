"use client";

import { createSlice } from "@reduxjs/toolkit";

export type PurchaseMode = "onDemand" | "live" | null;

export interface purchaseState {
    discount: number | null;
    mode: PurchaseMode;
}

const initialState: purchaseState = {
    discount: null,
    mode: null,
};

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        setDiscount: (state, action) => {
            state.discount = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setDiscount, setMode } = purchaseSlice.actions;

export default purchaseSlice.reducer;
