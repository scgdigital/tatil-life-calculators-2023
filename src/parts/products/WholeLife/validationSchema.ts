import { addYears, isAfter, isBefore, isValid, parse } from "date-fns";
import { isString } from "lodash-es";
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
    lastSmoked: Yup.string().when("isSmoker", (isSmoker, schema) => {
      return isSmoker[0] === "Yes"
        ? schema.test({
            name: "lastSmoked",
            test: (value: string | undefined, testContext) => {
              if (!value) {
                return testContext.createError({
                  message: "Last smoked date is required",
                });
              }

              const parsedDate = parse(value, "dd/MM/yyyy", new Date());

              if (!isValid(parsedDate)) {
                return testContext.createError({
                  message: "Invalid date format",
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
    coverAmount: Yup.string().required("Required"),
  },
};
