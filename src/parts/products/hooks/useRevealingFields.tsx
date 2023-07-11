import { useAppSelector } from "@/store/hooks";
import deepdash from "deepdash-es";
import { FormikValues, useFormikContext } from "formik";
import lodash, { get, isEmpty } from "lodash-es";
import { useEffect, useRef, useState } from "react";
import { AnyObject, AnySchema } from "yup";
import { validationSchemas } from "../WholeLife/validationSchema";
const _ = deepdash(lodash);

interface ISchemaObject {
  [key: string]: AnySchema<string, AnyObject, undefined, "">;
}

export const useRevealingFields = (
  initialFields = [],
  shouldValidate = true
) => {
  // should get the values of the state.formConfiguration object via accessing the object property with the key as the actual state.formConfiguration.stepId
  const { values, setFieldValue, validateForm, setFieldTouched } =
    useFormikContext<FormikValues>();
  const formConfiguration = useAppSelector((state) => state.formConfiguration);
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
  const initialFieldReached = useRef<number>(
    (() => {
      if (
        stepReached >
        Object.keys(formConfiguration.fieldIds).findIndex(
          (key) => key === formConfiguration.stepId
        )
      ) {
        return formConfiguration.fieldIds[formConfiguration.stepId as string]
          .length;
      } else {
        const fieldsPerStep =
          formConfiguration.fieldIds[formConfiguration.stepId as string];
        const initiallyDiscoveredFieldIndex =
          fieldsPerStep?.findIndex((field) => {
            if (
              field.split(",").length > 1 &&
              field.split(",").every((subField) => {
                return get(values, subField) !== undefined;
              })
            ) {
              return false;
            }
            return get(values, field) === undefined;
          }) === -1 &&
          fieldsPerStep
            .flatMap((field) => field.split(","))
            .every((field) => {
              return get(values, field) !== undefined;
            })
            ? fieldsPerStep.length
            : fieldsPerStep?.findIndex((field) => {
                if (
                  field.split(",").length > 1 &&
                  field.split(",").every((subField) => {
                    return get(values, subField) !== undefined;
                  })
                ) {
                  return false;
                }
                return get(values, field) === undefined;
              });

        if (
          fieldsPerStep
            .flatMap((field) => field.split(","))
            .every((field) => {
              return get(values, field) !== undefined;
            })
        ) {
          return formConfiguration.fieldIds[formConfiguration.stepId as string]
            .length;
        }
        if (
          fieldsPerStep.some((field) => {
            return get(values, field) === undefined;
          })
        ) {
          return initiallyDiscoveredFieldIndex;
        }

        return 0;
      }
    })()
  );
  const [fieldReached, setFieldReached] = useState<number>(
    /* Should be the the index of the last Uncompleted index from the fieldsIds array reached by cheching
     that the values are completed and correctly validated */
    initialFieldReached.current
  );

  // should include logic to go back and have all shown what was already shown

  const handleRevealingFields: any = async (all = false, initial = 0) => {
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

    if (initial) {
      setFieldReached(initial);
      setRevealedFields(stepFields.slice(0, initial + 1));
      initialFieldReached.current = 0;

      return;
    }

    await validateForm();
    if (
      !formConfiguration.fieldIds[
        formConfiguration.stepId as string
      ].hasOwnProperty(fieldReached)
    )
      return;
    const isMultiField =
      formConfiguration.fieldIds[formConfiguration.stepId as string][
        fieldReached
      ]?.split(",")?.length > 1;
    let isMultiStepFinished = false;
    // if (
    //   initialFieldReached > 0 &&
    //   revealedFields.length > initialFieldReached
    // ) {
    const fields =
      formConfiguration.fieldIds[formConfiguration.stepId as string][
        fieldReached
      ].split(",");
    if (isMultiField) {
      isMultiStepFinished = fields.every((field) => {
        const multiSchema: any =
          validationSchemas[
            formConfiguration.stepId as keyof typeof validationSchemas
          ];
        return (
          !isEmpty(values[field]) &&
          multiSchema[field].isValidSync(values[field])
        );
      }); // add validation success check
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
      const field = stepFields[Math.max(revealedFields.length - 1, 0)];
      const singleSchema: any =
        validationSchemas[
          formConfiguration.stepId as keyof typeof validationSchemas
        ];

      if (
        !isEmpty(values[field]) &&
        singleSchema[field].isValidSync(values[field])
      ) {
        setFieldReached((prev) => Math.min(prev + 1, stepFields.length - 1));
        setRevealedFields((prev) => {
          return [
            ...prev,
            stepFields[Math.min(prev.length, stepFields.length - 1)],
          ];
        });
      }
      // }
    }
  };
  useEffect(() => {
    if (initialFieldReached.current > 0) {
      handleRevealingFields(false, initialFieldReached.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (
        stepFields.every(
          (field) =>
            values[field] !== undefined ||
            stepReached >
              Object.keys(formConfiguration.fieldIds).findIndex(
                (key) => key === formConfiguration.stepId
              )
        )
      ) {
        handleRevealingFields(true);
        return;
      }
      if (!initialFieldReached.current) {
        handleRevealingFields(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  );

  return {
    revealedFields,
    setRevealedFields,
  };
};
