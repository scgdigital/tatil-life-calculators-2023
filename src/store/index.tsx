"use client";
import { configureStore } from "@reduxjs/toolkit";

import enumsReducer from "./slices/enumsSlice";
import formConfigurationReducer from "./slices/formConfigurationSlice";
import validationsReducer from "./slices/validationsSlice";

export const store = configureStore({
  reducer: {
    enums: enumsReducer,
    formConfiguration: formConfigurationReducer,
    // validations: validationsReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
