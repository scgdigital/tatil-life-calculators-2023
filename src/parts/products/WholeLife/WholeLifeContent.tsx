"use client";

import { FormWizard } from "@/parts/FormWizard/FormWizard";
import { WholeLifeHeader } from "@/parts/FormWizard/atoms";
import { NextButton } from "@/parts/PaginationButtons";
import { wholeLifeSteps } from "./formSteps";
import { useAppSelector } from "@/store/hooks";

export const WholeLifeContent = ({ data }: any) => {
  const titles = useAppSelector((state) => state.enums.title);
  const state = useAppSelector((state) => state);

  return (
    <>
      <FormWizard
        header={WholeLifeHeader}
        footer={NextButton}
        steps={wholeLifeSteps}
      />
      {/* {JSON.stringify(data)} */}
    </>
  );
};
