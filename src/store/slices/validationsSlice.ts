import { createSlice } from "@reduxjs/toolkit";
import type { Draft, PayloadAction } from "@reduxjs/toolkit";
import * as Yup from "yup";

export type IValidationState = {
  validationState: Yup.ObjectSchema<any>;
};

const initialState: IValidationState = {
  validationState: Yup.object().shape({}),
};

const validationsSlice = createSlice({
  name: "validations",
  initialState,
  reducers: {
    concatSchema(
      state: Draft<IValidationState>,
      action: PayloadAction<Yup.ObjectSchema<any>>
    ) {
      state.validationState?.concat(action.payload);
    },
  },
});

export const { concatSchema } = validationsSlice.actions;
export default validationsSlice.reducer;
