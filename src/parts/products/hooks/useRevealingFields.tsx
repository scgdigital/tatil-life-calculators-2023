import { useAppSelector } from "@/store/hooks";
import { FormikValues, useFormikContext } from "formik";
import { intersection, isEmpty } from "lodash-es";
import { useEffect, useState } from "react";
import deepdash from "deepdash-es";
import lodash from "lodash-es";
const _ = deepdash(lodash);

export const useRevealingFields = () => {
  // should get the values of the state.formConfiguration object via accessing the object property with the key as the actual state.formConfiguration.stepId
  const [stepFields, stepReached] = useAppSelector((state) => {
    const currentStepId = state.formConfiguration.stepId;
    const currentStep =
      state.formConfiguration.fieldIds[currentStepId as string];
    const stepReached = state.formConfiguration.stepReached;
    return [currentStep, stepReached];
  });
  const [revealedFields, setRevealedFields] = useState<Array<string>>(
    // should include logic to go back and have all shown what was already shown
    stepFields?.length ? stepFields.slice(0, 1) : []
  );

  const { values, setFieldValue, validateForm, setFieldTouched } =
    useFormikContext<FormikValues>();

  const handleRevealingFields = async (all = false) => {
    const errorPaths = await validateForm();

    if (intersection(revealedFields, Object.keys(errorPaths)).length) {
      console.log("Error within step, check valSchema");
      return;
    }
    if (all) {
      setRevealedFields(stepFields);
      return;
    }

    if (stepFields?.length >= revealedFields.length) {
      setRevealedFields((prev) => {
        return [
          ...prev,
          stepFields[Math.min(prev.length, stepFields.length - 1)],
        ];
      });
    }
  };
  useEffect(() => {
    if (
      stepFields.every((field) => values[field] !== undefined)
    ) {
      handleRevealingFields(true);
      return;
    }
    handleRevealingFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, stepFields]);

  return {
    revealedFields,
    setRevealedFields,
  };
};
