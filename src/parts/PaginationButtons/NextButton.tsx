import { Button } from "@/components/Button";
import {
  Formik,
  FormikBag,
  FormikProps,
  FormikValues,
  useFormikContext,
} from "formik";
import { isEmpty } from "lodash-es";
import deepdash from "deepdash-es";
import lodash from "lodash-es";
const _ = deepdash(lodash);

export function NextButton(
  currentStep: number | null,
  next: () => void,
  prev: () => void,
  formik: FormikProps<FormikValues>
) {
  const handleNext = async () => {
    const errorPaths = await formik.validateForm();

    if (!isEmpty(errorPaths)) {
      _.paths(errorPaths).forEach((errorPath) => {
        formik.setFieldTouched(errorPath as string, true, true);
      });
      return;
    }
    next();
  };

  return (
    <div className="ml-auto mr-0 w-[120px]">
      <Button
        className="transition-colors duration-300"
        variant="primary"
        onClick={handleNext}
        withArrow
        disabled={!isEmpty(formik.errors)}
      >
        Next
      </Button>
    </div>
  );
}
