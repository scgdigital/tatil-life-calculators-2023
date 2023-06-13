import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IConfigurationState = {
  stepId: string | null;
  fieldIds: {
    [stepId: string]: string[];
  };
  stepReached: number;
};

const initialState: IConfigurationState = {
  stepId: "step-1",
  fieldIds: {
    "step-1": ["lifeInsured", "isTriniResident", "isExistingCustomer"],
    "step-2": ["title,firstName,lastName", "gender", "dateOfBirth"],
    "step-3": ["isSmoker", "lastSmoked", "occupation"],
    "step-4": ["email", "phone", "address"],
  },
  stepReached: 0,
};

const formConfigurationSlice = createSlice({
  name: "formConfiguration",
  initialState,
  reducers: {
    setTargetStepId(
      state: IConfigurationState,
      action: PayloadAction<{
        stepId: string;
      }>
    ) {
      state.stepId = action.payload.stepId;
      state.stepReached =
        Object.keys(state.fieldIds).indexOf(action.payload.stepId) >
        state.stepReached
          ? Object.keys(state.fieldIds).indexOf(action.payload.stepId)
          : state.stepReached;
    },
  },
});

export const { setTargetStepId } = formConfigurationSlice.actions;
export default formConfigurationSlice.reducer;
