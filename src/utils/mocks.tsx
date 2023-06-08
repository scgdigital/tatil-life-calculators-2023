import * as Yup from "yup";
import { StepSchema } from "@/parts/FormWizard/FormWizard";
import { MockStep } from "@/mocks/MockStep";

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
    description: "Step 1",
    title: "Step 1",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep />,
  },
  {
    description: "Step 2",
    title: "Step 2",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep />,
  },
  {
    description: "Step 3",
    title: "Step 3",
    onSubmit: () => {},
    validationSchema: Yup.object().shape({}),
    children: <MockStep />,
  },
];
