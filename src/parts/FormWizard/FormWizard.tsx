import { withSibling } from "@/utils/methods";
import { Form, Formik } from "formik";
import { isNumber } from "lodash-es";
import { useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

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
    prev: () => void
  ) => React.ReactNode;
  initialValues?: Record<string, any>;
};

export type StepSchema = {
  title: string;
  description: string;
  validationSchema?: any;
  onSubmit?: any;
  children: React.ReactNode;
};

export function FormWizard({
  header,
  steps,
  footer,
  initialValues,
}: FormWizardProps) {
  const [currentStep, setCurrentStep] = useState(steps.length ? 0 : null);
  const previousStep = useRef<number | null>(null);
  const next = () => {
    previousStep.current = currentStep;
    setCurrentStep((prev) =>
      isNumber(prev) ? Math.min(prev + 1, steps.length - 1) : 0
    );
  };
  const prev = () => {
    previousStep.current = currentStep;
    setCurrentStep((prev) => (isNumber(prev) ? Math.max(prev - 1, 0) : 0));
  };

  const transitions = useTransition(
    isNumber(currentStep) ? steps[currentStep] : null,
    {
      exitBeforeEnter: true,
      config: {
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

  console.log("currentStep", currentStep);
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues ?? {}}
      onSubmit={async () => {
        console.log("submit");
      }}
      validationSchema={null}
    >
      <Form className="">
        {withSibling({ currentStep, next, prev, totalSteps: steps.length })(
          header
        )}
        {transitions((style, item) => (
          <animated.div style={{ ...style, minHeight: "420px" }}>
            {item?.children}
          </animated.div>
        ))}
        {footer(currentStep, next, prev)}
      </Form>
    </Formik>
  );
}
