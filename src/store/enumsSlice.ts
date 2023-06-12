import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IEnumsState = Record<string, any>;

const initialState: IEnumsState = {
  title: ["Mr", "Mrs", "Miss", "Ms", "Other"],
};

const enumsSlice = createSlice({
  name: "enums",
  initialState,
  reducers: {
    setEnums(state: IEnumsState, action: PayloadAction<IEnumsState>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setEnums } = enumsSlice.actions;
export default enumsSlice.reducer;
