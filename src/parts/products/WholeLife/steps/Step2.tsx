import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Input } from "@/components/Input";
import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { ValidationWrapper } from "@/components/ValidationWrapper";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { useAppSelector } from "@/store/hooks";
import { FormikValues, useFormikContext } from "formik";
import { get } from "lodash-es";
import { useRevealingFields } from "../../hooks";

export function Step2() {
  const { title } = useAppSelector((state) => state.enums);
  const { values, setFieldValue, setFieldTouched, errors } =
    useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();

  return (
    <div className="flex flex-col w-full">
      <ValidationWrapper
        names={["title", "firstName", "lastName"]}
        show={revealedFields.includes("title,firstName,lastName")}
      >
        <RevealWrapper
          show={revealedFields.includes("title,firstName,lastName")}
          names={["title", "firstName", "lastName"]}
        >
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
              name="title"
              onBlur={() => {
                setFieldTouched("title", true);
              }}
            />
            <Input
              name="firstName"
              value={values.firstName}
              placeholder="First Name"
              onChange={(val) => {
                setFieldValue("firstName", val);
              }}
              onBlur={() => {
                setFieldTouched("firstName", true);
              }}
            />
            <Input
              name="lastName"
              value={values.lastName}
              placeholder="Last Name"
              onChange={(val) => {
                setFieldValue("lastName", val);
              }}
              onBlur={() => {
                setFieldTouched("lastName", true);
              }}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        names={["gender"]}
        show={revealedFields.includes("gender")}
      >
        <RevealWrapper
          show={revealedFields.includes("gender")}
          names={["gender"]}
        >
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
      </ValidationWrapper>
      <ValidationWrapper
        names={["dateOfBirth"]}
        show={revealedFields.includes("dateOfBirth")}
      >
        <RevealWrapper
          show={revealedFields.includes("dateOfBirth")}
          names={["dateOfBirth"]}
        >
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
      </ValidationWrapper>
    </div>
  );
}
