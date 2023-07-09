import * as Yup from "yup";

export const validationSchemas = {
  "step-1": {
    lifeInsured: Yup.string().required("Required"),
    isTriniResident: Yup.string().required("Required"),
    isExistingCustomer: Yup.string().required("Required"),
  },
  "step-2": {
    title: Yup.string().required("Required"),
    firstName: Yup.string().min(2, "Too short").required("Required"),
    lastName: Yup.string().min(2, "Too short").required("Required"),
    gender: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),
  },
  "step-3": {
    isSmoker: Yup.string().required("Required"),
    lastSmoked: Yup.string().required("Required"),
  },
};
