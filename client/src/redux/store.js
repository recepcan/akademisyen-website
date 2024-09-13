import { configureStore } from "@reduxjs/toolkit";
import headerEventsSlice from "./headerEventsSlice";

export const store =configureStore({
    reducer:{
        header:headerEventsSlice
    }
})