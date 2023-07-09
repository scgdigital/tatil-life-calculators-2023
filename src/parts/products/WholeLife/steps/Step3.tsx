import { DatePicker } from "@/components/DatePicker";
import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { useAppSelector } from "@/store/hooks";
import { FormikValues, useFormikContext } from "formik";
import { useRevealingFields } from "../../hooks";
import { ValidationWrapper } from "@/components/ValidationWrapper";

export function Step3() {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();

  return (
    <div className="flex flex-col w-full">
      <ValidationWrapper
        show={revealedFields.includes("isSmoker")}
        names={["isSmoker"]}
      >
        <RevealWrapper
          show={revealedFields.includes("isSmoker")}
          names={["isSmoker"]}
        >
          <Question
            className="mb-4"
            trackId="titleAndName"
            text={
              "Do you, or have you ever, used any nicotine products including smoking, vaping, gum or patches in the past 5 years?"
            }
            tooltip={{
              content: "Please answer yes or no",
            }}
          />
          <div className="flex gap-8 my-4">
            <SideBySideButtons
              className="max-w-[310px]"
              labels={["No", "Yes"]}
              onClick={(val) => {
                setFieldValue("isSmoker", val);
              }}
              value={values?.isSmoker || null}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        show={values.isSmoker === "Yes"}
        names={["lastSmoked"]}
      >
        <RevealWrapper
          show={
            revealedFields.includes("lastSmoked") && values.isSmoker === "Yes"
          }
          names={["lastSmoked"]}
        >
          <Question
            trackId="lastSmoked"
            text={
              "When was the last time your used any nicotine products including smoking, vaping, gum or patches in the past 5 years? "
            }
            tooltip={{
              content: "Please pick the date",
            }}
          />
          <div className="flex gap-8 my-4">
            <DatePicker
              onDateChange={(val) => setFieldValue("lastSmoked", val)}
              value={values.lastSmoked}
              onBlur={() => {
                setFieldTouched("lastSmoked", true);
              }}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
    </div>
  );
}
