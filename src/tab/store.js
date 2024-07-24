import { configureStore } from "@reduxjs/toolkit";
import tabSlice from "./tabSlice";
import billSlice from "./billSlice";
export const store = configureStore({
    reducer:{
        tab:tabSlice,
        bill:billSlice
      
    }
})