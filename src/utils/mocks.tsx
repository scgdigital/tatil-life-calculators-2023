import { MockStep1 } from "@/mocks/MockStep1";
import { StepSchema } from "@/parts/FormWizard/FormWizard";
import * as Yup from "yup";

export const mockOptions = [
  {
    id: 1,
    label: "Option 1",
    value: "option1",
  },
  {
    id: 2,
    label: "Option 2",
    value: "option2",
  },
  {
    id: 3,
    label: "Option 3",
    value: "option3",
  },
  {
    id: 4,
    label: "Option 4",
    value: "option4",
  },
];

export const mockSteps: StepSchema[] = [
  {
    id: "step-1",
    description: "Step 1",
    title: "Step 1",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep1 />,
  },
  {
    id: "step-2",
    description: "Step 2",
    title: "Step 2",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep1 />,
  },
  {
    id: "step-3",
    description: "Step 3",
    title: "Step 3",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep1 />,
  },
];
