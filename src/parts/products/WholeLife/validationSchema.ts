import * as Yup from "yup";

export const validationSchemas = {
  "step-1": Yup.object().shape({
    lifeInsured: Yup.string().required("Required"),
    isTriniResident: Yup.string().required("Required"),
    isExistingCustomer: Yup.string().required("Required"),
  }),
};
