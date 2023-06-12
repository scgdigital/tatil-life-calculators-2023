import { ProgressSteps } from "@/components/ProgressSteps";
import { BodyTextAlt, Header } from "@/components/Typography";
import { BackButton } from "@/parts/PaginationButtons";
import { isNumber } from "lodash-es";

export function WholeLifeHeader({ currentStep, next, prev, ...props }: any) {
  return (
    <>
      <div className="w-full justify-between items-center flex py-2">
        {BackButton(currentStep, next, prev)}

        <div className="flex items-center gap-x-4">
          <BodyTextAlt>Your Information</BodyTextAlt>
          {isNumber(currentStep) && props?.totalSteps ? (
            <ProgressSteps currentStep={currentStep + 1} steps={props.totalSteps} />
          ) : null}
        </div>
      </div>
      <Header className="mt-4 mb-14 text-left">Let&apos;s get a quote in under 90 seconds.</Header>
    </>
  );
}
