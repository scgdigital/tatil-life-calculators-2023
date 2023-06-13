import { useAppSelector } from "@/store/hooks";
import deepdash from "deepdash-es";
import { FormikValues, useFormikContext } from "formik";
import lodash, { intersection, isEmpty } from "lodash-es";
import { useEffect, useState } from "react";
const _ = deepdash(lodash);

export const useRevealingFields = (initialFields = []) => {
  // should get the values of the state.formConfiguration object via accessing the object property with the key as the actual state.formConfiguration.stepId
  const formConfiguration = useAppSelector((state) => state.formConfiguration);
  const [fieldReached, setFieldReached] = useState<number>(0);
  const [stepFields, stepReached] = useAppSelector((state) => {
    if (initialFields.length) {
      return [initialFields, state.formConfiguration.stepReached];
    }
    const currentStepId = state.formConfiguration.stepId;
    const currentStep =
      state.formConfiguration.fieldIds[currentStepId as string];
    const stepReached = state.formConfiguration.stepReached;
    return [currentStep, stepReached];
  });
  const [revealedFields, setRevealedFields] = useState<Array<string>>(() => {
    if (initialFields.length) {
      return initialFields;
    }
    return stepFields.slice(0, 1);
  });
  // should include logic to go back and have all shown what was already shown

  const { values, setFieldValue, validateForm, setFieldTouched } =
    useFormikContext<FormikValues>();

  const handleRevealingFields: any = async (all = false) => {
    if (
      !all &&
      stepReached >
        Object.keys(formConfiguration.fieldIds).findIndex(
          (key) => key === formConfiguration.stepId
        )
    ) {
      return handleRevealingFields(true);
    }

    if (all) {
      setRevealedFields(stepFields);
      return;
    }
    const errorPaths = await validateForm();
    if (intersection(revealedFields, Object.keys(errorPaths)).length) {
      console.log("Error within step, check valSchema");
      return;
    }
    const isMultiField =
      formConfiguration.fieldIds[formConfiguration.stepId as string][
        fieldReached
      ].split(",").length > 1;
    let isMultiStepFinished = false;
    if (isMultiField) {
      const fields =
        formConfiguration.fieldIds[formConfiguration.stepId as string][
          fieldReached
        ].split(",");
      isMultiStepFinished = fields.every((field) => !isEmpty(values[field])); // add validation success check
      if (
        isMultiStepFinished &&
        stepFields?.length - 1 > revealedFields.length
      ) {
        setFieldReached((prev) => Math.min(prev + 1, stepFields.length - 1));
        setRevealedFields((prev) => {
          return [
            ...prev,
            stepFields[Math.min(prev.length, stepFields.length - 1)],
          ];
        });
        return;
      }
      return;
    }
    if (stepFields?.length - 1 >= revealedFields.length) {
      setFieldReached((prev) => Math.min(prev + 1, stepFields.length - 1));
      setRevealedFields((prev) => {
        return [
          ...prev,
          stepFields[Math.min(prev.length, stepFields.length - 1)],
        ];
      });
    }
  };
  useEffect(() => {
    if (stepFields.every((field) => values[field] !== undefined)) {
      handleRevealingFields(true);
      return;
    }
    handleRevealingFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return {
    revealedFields,
    setRevealedFields,
  };
};
