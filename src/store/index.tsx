import { configureStore } from "@reduxjs/toolkit";

import enumsReducer from "./enumsSlice";
import formConfigurationReducer from "./formConfigurationSlice";
export const store = configureStore({
  reducer: {
    enums: enumsReducer,
    formConfiguration: formConfigurationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
