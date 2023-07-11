"use client";

import { FormWizard } from "@/parts/FormWizard/FormWizard";
import { WholeLifeHeader } from "@/parts/FormWizard/atoms";
import { NextButton } from "@/parts/PaginationButtons";
import { useAppDispatch } from "@/store/hooks";
import { setEnums } from "@/store/slices/enumsSlice";
import { isEmpty } from "lodash-es";
import { useEffect } from "react";
import { wholeLifeSteps } from "./formSteps";

export const WholeLifeContent = ({ data }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isEmpty(data)) {
      // console.log({ data });
      dispatch(setEnums(data));
    }
  }, [dispatch, data]);

  return (
    <>
      <FormWizard
        header={WholeLifeHeader}
        footer={NextButton}
        steps={wholeLifeSteps}
        initialValues={{
          coverAmount: "25000",
        }}
      />
      {/* {JSON.stringify(data)} */}
    </>
  );
};
