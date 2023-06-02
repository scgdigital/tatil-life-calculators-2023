import { cx } from "class-variance-authority";

type ProgressStepsProps = {
  steps: number;
  currentStep: number;
  className?: string;
  [x: string]: any;
};

export const ProgressSteps = ({
  steps,
  currentStep,
  className,
  ...props
}: ProgressStepsProps) => {
  return (
    <div className={cx("block", className)}>
      <div className="inline font-bold align-middle">{String(currentStep)}</div>
      <div className="inline text-tatil-palette-neutrals-300 align-middle"> / </div>
      <div className="inline text-tatil-palette-neutrals-300 align-middle">{String(steps)}</div>
    </div>
  );
};
