import { SideBySideButtons } from "@/parts/FormParts";
import { Question } from "@/parts/FormParts/Question";
import { useAppSelector } from "@/store/hooks";
import { FormikValues, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useRevealingFields } from "../../hooks";
import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";

export function Step1() {
  const { values, setFieldValue } = useFormikContext<FormikValues>();
  const { revealedFields } = useRevealingFields();
  return (
    <div className="flex flex-col w-full">
      <RevealWrapper show={revealedFields.includes("lifeInsured")}>
        <Question
          trackId="lifeInsured"
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
              setFieldValue("lifeInsured", val);
            }}
            value={values?.lifeInsured || null}
          />
        </div>
      </RevealWrapper>
      <RevealWrapper show={revealedFields.includes("isTriniResident")}>
        <Question
          trackId="isTriniResident"
          text={"Are you normally a resident in Trinidad and Tobago?"}
          tooltip={{
            content: "Please specify your residency status.",
          }}
        />
        <div className="flex gap-8 my-6">
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
      <RevealWrapper show={revealedFields.includes("isExistingCustomer")}>
        <Question
          trackId="lifeInsured"
          text={"Are you an existing Tatil or Tatil Life customer?"}
          tooltip={{
            content: "Please specify your customer status.",
          }}
        />
        <div className="flex gap-8 my-6">
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
    </div>
  );
}
