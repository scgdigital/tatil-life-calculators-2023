import * as Yup from "yup";
import { Step1, Step2 } from "./steps";
import { validationSchemas } from "./validationSchema";

/* 
export type StepSchema = {
  title: string;
  description: string;
  validationSchema?: any;
  onSubmit?: any;
  children: React.ReactNode;
};

*/

export const wholeLifeSteps = [
  {
    id: "step-1",
    title: "Step 1",
    description: "Step 1 description",
    children: <Step1 />,
    validationSchema: validationSchemas["step-1"],
  },
  {
    id: "step-2",
    title: "Step 2",
    description: "Step 2 description",
    children: <Step2 />,
    validationSchema: validationSchemas["step-2"],
  },
  {
    id: "step-3",
    title: "Step 3",
    description: "Step 3 description",
    children: <div>Step 3</div>,
    validationSchema: Yup.object().shape({}),
  },
];
