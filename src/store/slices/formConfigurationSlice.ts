import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IConfigurationState = {
  stepId: string;
  fieldIds: {
    [stepId: string]: string[];
  };
  stepReached: number;
  prevFieldSet: string | null;
};

const initialState: IConfigurationState = {
  stepId: "step-1",
  fieldIds: {
    "step-1": ["lifeInsured", "isTriniResident", "isExistingCustomer"],
    "step-2": ["title,firstName,lastName", "gender", "dateOfBirth"],
    "step-3": ["isSmoker", "lastSmoked"],
    "step-4": ["email", "phone", "address"],
  },
  stepReached: 0,
  prevFieldSet: null,
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
    setPrevFieldSet(state: IConfigurationState, action: PayloadAction<string>) {
      state.prevFieldSet = state.fieldIds[action.payload].join(",");
    },
  },
});

export const { setTargetStepId, setPrevFieldSet } =
  formConfigurationSlice.actions;
export default formConfigurationSlice.reducer;
