import { Button } from "@/components/Button";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { FormikValues, useField, useFormikContext } from "formik";

export function MockStep1() {
  const { values } = useFormikContext<FormikValues>();
  const [{ value }, , { setValue }] = useField("lifeInsured");
  return (
    <div className="flex flex-col w-full">
      <Question
        text={"Who are you getting this quote for?"}
        tooltip={{
          content: "Please specify who is the life insured.",
        }}
      />
      <div className="flex gap-8 my-6">
        <SideBySideButtons
          className="max-w-[310px]"
          labels={["Myself", "Another Person"]}
          onClick={(val) => {
            setValue(val);
          }}
        />
      </div>
      <Question
        text={"Are you normally a resident in Trinidad and Tobago?"}
        tooltip={{
          content: "Please specify your residency status.",
        }}
      />
      <div className="flex gap-8 my-6">
        <SideBySideButtons
          className="max-w-[310px]"
          labels={["Yes", "No"]}
          onClick={(val) => {
            setValue(val);
          }}
        />
      </div>
      <Question
        text={"Are you an existing Tatil or Tatil Life customer?"}
        tooltip={{
          content: "Please specify your customer status.",
        }}
      />
      <div className="flex gap-8 my-6">
        <SideBySideButtons
          className="max-w-[310px]"
          labels={["Yes", "No"]}
          onClick={(val) => {
            setValue(val);
          }}
        />
      </div>
    </div>
  );
}
