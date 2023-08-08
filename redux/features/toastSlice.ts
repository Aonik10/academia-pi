import { createSlice } from "@reduxjs/toolkit";
import { ToastMessageProps } from "@/components/admin-components/toast";

export interface toastState {
    display: boolean;
    data: ToastMessageProps | null;
}

const initialState: toastState = {
    display: false,
    data: null,
};

export const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        displayToast: (state, action) => {
            state.display = action.payload;
        },
        setToastData: (state, action) => {
            state.data = action.payload;
        },
        removeToastData: (state) => {
            state.data = null;
        },
    },
});

export const { displayToast, setToastData, removeToastData } =
    toastSlice.actions;

export default toastSlice.reducer;
