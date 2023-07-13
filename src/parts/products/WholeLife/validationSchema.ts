import { addYears, isAfter, isBefore, isValid, parse } from "date-fns";
import * as Yup from "yup";
import "yup-phone-lite";

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
    lastSmoked: Yup.string().when("isSmoker", (isSmoker, schema) => {
      return isSmoker[0] === "Yes"
        ? schema.test({
            name: "lastSmoked",
            test: (value: string | undefined, testContext) => {
              if (!value) {
                return testContext.createError({
                  message: "Required",
                });
              }

              const parsedDate = parse(value, "dd/MM/yyyy", new Date());

              if (!isValid(parsedDate)) {
                return testContext.createError({
                  message: "Invalid Date Format",
                });
              }

              const fiveYearsAgo = addYears(new Date(), -5);
              const now = new Date();

              if (
                isBefore(parsedDate, fiveYearsAgo) ||
                isAfter(parsedDate, now)
              ) {
                return testContext.createError({
                  message: "Date must be within the last 5 years",
                });
              }

              return true;
            },
          })
        : schema;
    }),
  },
  "step-4": {
    email: Yup.string()
      .trim()
      .required("Required")
      .email("Invalid email. Please use email format ___@___.___")
      .matches(
        new RegExp(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        "Invalid email. Please use email format ___@___.___"
      )
      .required("Required"),
    phoneNumber: Yup.string()
      .phone("TT", "A valid Trinidad and Tobago phone number is required")
      .matches(
        new RegExp(/^\d{10}$/),
        "Invalid phone number. Please use phone number format (000)-000-0000"
      )
      .required("Required"),
    hasAgreed: Yup.boolean().oneOf([true], "Required").required("Required"),
  },
  "step-5": {
    coverAmount: Yup.string().required("Required"),
  },
};
