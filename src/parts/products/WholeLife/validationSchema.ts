import * as Yup from "yup";

export const validationSchemas = {
  "step-1": Yup.object().shape({
    lifeInsured: Yup.string().required("Required"),
    isTriniResident: Yup.string().required("Required"),
    isExistingCustomer: Yup.string().required("Required"),
  }),
  "step-2": Yup.object().shape({
    title: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),
  }),
};
