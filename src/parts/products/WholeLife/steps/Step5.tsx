/* eslint-disable react-hooks/exhaustive-deps */
import { CoverAmountSelect } from "@/parts/FormParts";
import { useAppDispatch } from "@/store/hooks";
import {
  setDescription,
  setTitle,
} from "@/store/slices/formConfigurationSlice";
import { useEffect } from "react";

export const Step5 = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle("Select your quote"));
    dispatch(
      setDescription(
        "You can now apply online and once complete we’ll call you to answer any questions and arrange cover."
      )
    );
  }, []);
  return <CoverAmountSelect />;
};
