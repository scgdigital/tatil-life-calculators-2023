import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { FormikValues, useFormikContext } from "formik";
import { useRevealingFields } from "../../hooks";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/Input";
import { DatePicker } from "@/components/DatePicker";

export function Step3() {
  const { title } = useAppSelector((state) => state.enums);
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();

  return (
    <div className="flex flex-col w-full">
      <RevealWrapper show={revealedFields.includes("isSmoker")}>
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
      <RevealWrapper
        show={
          revealedFields.includes("lastSmoked") && values.isSmoker === "Yes"
        }
      >
        <Question
          trackId="gender"
          text={
            "When was the last time your used any nicotine products including smoking, vaping, gum or patches in the past 5 years? "
          }
          tooltip={{
            content: "Please pick the date",
          }}
        />
        <div className="flex gap-8 my-6">
          <DatePicker
            onDateChange={(val) => setFieldValue("lastSmoked", val)}
            value={values.lastSmoked}
          />
        </div>
      </RevealWrapper>
    </div>
  );
}
