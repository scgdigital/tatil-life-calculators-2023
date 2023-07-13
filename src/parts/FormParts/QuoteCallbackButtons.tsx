import { Button } from "@/components/Button";
import { FormikProps, FormikValues } from "formik";

export const QuoteCallbackButtons = (
  currentStep: number | null,
  next: () => void,
  prev: () => void,
  formik: FormikProps<FormikValues>
) => {
  return (
    <div className="flex justify-between flex-wrap mb-10">
      <div className="flex flex-col items-center basis-full sm:basis-1/2">
        <div className="font-semibold">Have any questions?</div>
        <Button variant="secondary" className="my-2">
          Speak to an Agent
        </Button>
        <div className="leading-6 font-normal">
          Call us, Mon - Fri: 10am - 4pm
        </div>
      </div>
      <div className="flex flex-col items-center basis-full sm:basis-1/2 mt-6 sm:mt-0">
        <div className="font-semibold">Ready to get cover?</div>
        <Button variant="primary" className="my-2">
          Book an appointment
        </Button>
        <div className="leading-6 font-normal">
          {`We'll call you to get your cover.`}
        </div>
      </div>
    </div>
  );
};
