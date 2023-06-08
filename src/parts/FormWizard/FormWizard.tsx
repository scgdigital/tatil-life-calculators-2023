import { Form, Formik } from "formik";

type FormWizardProps = {
  header: React.ReactNode;
  steps: StepSchema[];
  footer: React.ReactNode;
  initialValues?: Record<string, any>;
};

type StepSchema = {
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
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues ?? {}}
      onSubmit={async () => {
        console.log("submit");
      }}
      validationSchema={null}
    >
      <Form></Form>
    </Formik>
  );
}

/*

    <Formik
      enableReinitialize // IMPORTANT: Resets form if initialValues change (e.g. onSelection CalculatorSelector)
      initialValues={initialValues} // Will have a provider handling the enums,
      // where it will choose initialValues (to build the repayment and also set validations )
      onSubmit={handleSubmit}
      validationSchema={Step.validationSchema ? Step.validationSchema(validationContext, targetProduct) : null}
    >

    */
