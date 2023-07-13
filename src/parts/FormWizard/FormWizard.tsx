"use client";
import * as Yup from "yup";
import { withSibling } from "@/utils/methods";
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from "formik";
import { isEmpty, isFunction, isNumber } from "lodash-es";
import { Fragment, useEffect, useRef, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import {
  setPrevFieldSet,
  setStepReached,
  setTargetStepId,
} from "@/store/slices/formConfigurationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { validationSchemas } from "../products/WholeLife/validationSchema";

type FormWizardProps = {
  header: (
    currentStep: number | null,
    next: () => void,
    prev: () => void,
    props: {
      totalSteps: number;
      [x: string]: any;
    }
  ) => React.ReactNode;
  steps: StepSchema[];
  footer: (
    currentStep: number | null,
    next: () => void,
    prev: () => void,
    formik: FormikProps<FormikValues>
  ) => React.ReactNode;
  initialValues?: Record<string, any>;
};

export type StepSchema = {
  id: string;
  title: string;
  description: string;
  validationSchema?: any;
  paginationButtons?: (
    currentStep: number | null,
    next: () => void,
    prev: () => void,
    formik: FormikProps<FormikValues>
  ) => React.ReactNode;
  onSubmit?: any;
  children: React.ReactNode;
};

export function FormWizard({
  header,
  steps,
  footer,
  initialValues,
}: FormWizardProps) {
  const stepId = useAppSelector((state) => state.formConfiguration.stepId);
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const previousStep = useRef<number>(0);
  const prevStepNames = useAppSelector(
    (state) => state.formConfiguration.prevFieldSet
  );
  const next = () => {
    dispatch(
      setPrevFieldSet(
        steps[Math.min(currentStep + 1, steps.length - 1)]?.id ?? stepId
      )
    );
    previousStep.current = currentStep;
    setCurrentStep((prev) =>
      isNumber(prev) ? Math.min(prev + 1, steps.length - 1) : 0
    );
    dispatch(
      setTargetStepId({
        stepId:
          steps[Math.min((currentStep as number) + 1, steps.length - 1)]?.id,
      })
    );
    dispatch(
      setStepReached({
        stepId:
          steps[Math.min((currentStep as number) + 1, steps.length - 1)]?.id,
      })
    );
  };
  const prev = () => {
    dispatch(
      setPrevFieldSet(
        steps[Math.max((currentStep as number) - 1, 0)]?.id ?? stepId
      )
    );
    previousStep.current = currentStep;
    setCurrentStep((prev) => (isNumber(prev) ? Math.max(prev - 1, 0) : 0));
    dispatch(
      setTargetStepId({
        stepId: steps[Math.max((currentStep as number) - 1, 0)]?.id,
      })
    );
  };

  const transitions = useTransition(
    isNumber(currentStep) ? steps[currentStep] : null,
    {
      exitBeforeEnter: true,
      config: {
        ...config.gentle,
        duration: 350,
      },
      from: {
        opacity: 0,
        transform:
          previousStep.current === null
            ? "translate3d(50%,0,0)"
            : previousStep.current !== null &&
              isNumber(currentStep) &&
              previousStep.current < currentStep
            ? "translate3d(50%,0,0)"
            : "translate3d(-50%,0,0)",
      },
      enter: { opacity: 1, transform: "translate3d(0%,0,0)", duration: 250 },
      leave: {
        opacity: 0,
        transform:
          previousStep.current !== null &&
          isNumber(currentStep) &&
          previousStep.current < currentStep
            ? "translate3d(-50%,0,0)"
            : "translate3d(50%,0,0)",
      },
    }
  );
  const propsRef = useRef<any>(null);

  useEffect(() => {
    propsRef?.current?.validateForm();
    if (isEmpty(prevStepNames)) {
      dispatch(
        setPrevFieldSet(steps[Math.min(currentStep, steps.length - 1)]?.id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Formik
      innerRef={propsRef}
      enableReinitialize
      initialValues={initialValues ?? {}}
      onSubmit={async () => {
        console.log("submit");
      }}
      validationSchema={
        steps.find((step) => step.id === stepId)?.validationSchema
          ? Yup.object().shape(
              steps.find((step) => step.id === stepId)?.validationSchema
            )
          : null
        //   ? validationSchemas[stepId as keyof typeof validationSchemas]
        //   : null
      }
    >
      {(formikProps) => {
        return (
          <Form className="w-full flex-shrink-0 flex-grow">
            <>
              {withSibling({
                currentStep,
                next,
                prev,
                totalSteps: steps.length,
              })(header)}
              {transitions((style, item) => (
                <Fragment key={item?.id}>
                  <animated.div
                    style={{
                      ...style,
                      minHeight: "360px",
                      width: "100%",
                    }}
                  >
                    {item?.children}
                  </animated.div>
                </Fragment>
              ))}
              {steps[currentStep].hasOwnProperty("paginationButtons")
                ? (steps[currentStep].paginationButtons as Function)(
                    currentStep,
                    next,
                    prev,
                    formikProps
                  )
                : footer(currentStep, next, prev, formikProps)}
            </>
          </Form>
        );
      }}
    </Formik>
  );
}
