import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type IConfigurationState = {
  title?: string;
  description?: string;
  stepId: string;
  fieldIds: {
    [stepId: string]: string[];
  };
  stepReached: number;
  prevFieldSet: string | null;
};

const initialState: IConfigurationState = {
  stepId: "step-1",
  title: "Let's get a quote in under 90 seconds",
  description: "",
  fieldIds: {
    "step-1": ["lifeInsured", "isTriniResident", "isExistingCustomer"],
    "step-2": ["title,firstName,lastName", "gender", "dateOfBirth"],
    "step-3": ["isSmoker", "lastSmoked"],
    "step-4": ["email", "phoneNumber", "hasAgreed"],
    "step-5": [],
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
    },
    setStepReached(
      state: IConfigurationState,
      action: PayloadAction<{
        stepId: string;
      }>
    ) {
      state.stepReached =
        Object.keys(state.fieldIds).indexOf(action.payload.stepId) >
        state.stepReached
          ? Object.keys(state.fieldIds).indexOf(action.payload.stepId)
          : state.stepReached;
    },
    setPrevFieldSet(state: IConfigurationState, action: PayloadAction<string>) {
      state.prevFieldSet = state.fieldIds[action.payload].join(",");
    },
    setTitle(state: IConfigurationState, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state: IConfigurationState, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
});

export const {
  setTargetStepId,
  setPrevFieldSet,
  setStepReached,
  setTitle,
  setDescription,
} = formConfigurationSlice.actions;
export default formConfigurationSlice.reducer;
