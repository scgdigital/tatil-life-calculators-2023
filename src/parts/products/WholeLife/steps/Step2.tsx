import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { FormikValues, useFormikContext } from "formik";
import { useRevealingFields } from "../../hooks";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { useAppSelector } from "@/store/hooks";
import { Input } from "@/components/Input";
import { DatePicker } from "@/components/DatePicker";

export function Step2() {
  const { title } = useAppSelector((state) => state.enums);
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();

  console.log({ revealedFields });
  return (
    <div className="flex flex-col w-full">
      <RevealWrapper show={revealedFields.includes("title,firstName,lastName")}>
        <Question
          className="mb-4"
          trackId="titleAndName"
          text={"What is your name?"}
          tooltip={{
            content: "Please specify your title, firstname and lastname.",
          }}
        />
        <div className="flex gap-x-2 items-center mb-4">
          <Dropdown
            placeholder="Title"
            className="!w-[200px]"
            options={title.map((title: string) => ({
              label: title,
              value: title,
            }))}
            syncValue={values?.title}
            onOptionChange={(option) => {
              setFieldValue("title", option);
            }}
          />
          <Input
            value={values.firstName}
            placeholder="First Name"
            onChange={(val) => {
              setFieldValue("firstName", val);
            }}
          />
          <Input
            value={values.lastName}
            placeholder="Last Name"
            onChange={(val) => {
              setFieldValue("lastName", val);
            }}
          />
        </div>
      </RevealWrapper>
      <RevealWrapper show={revealedFields.includes("gender")}>
        <Question
          trackId="gender"
          text={"What is your gender"}
          tooltip={{
            content: "Please specify your residency status.",
          }}
        />
        <div className="flex gap-8 my-4">
          <SideBySideButtons
            className="max-w-[310px]"
            labels={["Male", "Female"]}
            onClick={(val) => {
              setFieldValue("gender", val);
            }}
            value={values?.gender || null}
          />
        </div>
      </RevealWrapper>
      <RevealWrapper show={revealedFields.includes("dateOfBirth")}>
        <Question
          trackId="dateOfBirth"
          text={"What is your date of birth?"}
          tooltip={{
            content: "Please specify your date of birth",
          }}
        />
        <div className="flex gap-8 my-6">
          <DatePicker
            onDateChange={(val) => setFieldValue("dateOfBirth", val)}
            value={values.dateOfBirth}
          />
        </div>
      </RevealWrapper>
    </div>
  );
}
