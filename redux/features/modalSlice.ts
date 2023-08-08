"use client";

import { CourseCreated } from "@/utils/interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface modalState {
    display: boolean;
    currentCourse: CourseCreated | null;
}

const initialState: modalState = {
    display: false,
    currentCourse: null,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setDisplay: (state, action) => {
            state.display = action.payload;
        },
        setCurrentCourse: (state, action) => {
            state.currentCourse = action.payload;
        },
    },
});

export const { setDisplay, setCurrentCourse } = modalSlice.actions;

export default modalSlice.reducer;
