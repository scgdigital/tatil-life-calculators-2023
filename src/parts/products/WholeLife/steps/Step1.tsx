import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { ValidationWrapper } from "@/components/ValidationWrapper";
import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { FormikValues, useFormikContext } from "formik";
import { useRevealingFields } from "../../hooks";

export function Step1() {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();
  return (
    <div className="flex flex-col w-full">
      <ValidationWrapper
        names={["lifeInsured"]}
        show={revealedFields.includes("lifeInsured")}
      >
        <RevealWrapper
          show={revealedFields.includes("lifeInsured")}
          names={["lifeInsured"]}
        >
          <Question
            trackId="lifeInsured"
            text={"Who are you getting this quote for?"}
            tooltip={{
              content: "Please specify who is the life insured.",
            }}
          />
          <div className="flex gap-8 my-4">
            <SideBySideButtons
              className="max-w-[310px]"
              labels={["Myself", "Another Person"]}
              onClick={(val) => {
                setFieldValue("lifeInsured", val);
              }}
              value={values?.lifeInsured || null}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        names={["isTriniResident"]}
        show={revealedFields.includes("isTriniResident")}
      >
        <RevealWrapper
          show={revealedFields.includes("isTriniResident")}
          names={["isTriniResident"]}
        >
          <Question
            trackId="isTriniResident"
            text={"Are you normally a resident in Trinidad and Tobago?"}
            tooltip={{
              content: "Please specify your residency status.",
            }}
          />
          <div className="flex gap-8 my-4">
            <SideBySideButtons
              className="max-w-[310px]"
              labels={["No", "Yes"]}
              onClick={(val) => {
                setFieldValue("isTriniResident", val);
              }}
              value={values?.isTriniResident || null}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        names={["isExistingCustomer"]}
        show={revealedFields.includes("isExistingCustomer")}
      >
        <RevealWrapper
          show={revealedFields.includes("isExistingCustomer")}
          names={["isExistingCustomer"]}
        >
          <Question
            trackId="lifeInsured"
            text={"Are you an existing Tatil or Tatil Life customer?"}
            tooltip={{
              content: "Please specify your customer status.",
            }}
          />
          <div className="flex gap-8 my-4">
            <SideBySideButtons
              className="max-w-[310px]"
              labels={["No", "Yes"]}
              onClick={(val) => {
                setFieldValue("isExistingCustomer", val);
              }}
              value={values?.isExistingCustomer || null}
            />
          </div>
        </RevealWrapper>
      </ValidationWrapper>
    </div>
  );
}
