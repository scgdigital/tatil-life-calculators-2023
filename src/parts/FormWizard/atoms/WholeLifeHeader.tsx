import { ProgressSteps } from "@/components/ProgressSteps";
import { BodyTextAlt, Header, Subtitle } from "@/components/Typography";
import { BackButton } from "@/parts/PaginationButtons";
import { useAppSelector } from "@/store/hooks";
import { cx } from "class-variance-authority";
import { isNumber } from "lodash-es";

export function WholeLifeHeader({ currentStep, next, prev, ...props }: any) {
  const [title, description] = useAppSelector((state) => [
    state.formConfiguration.title,
    state.formConfiguration.description,
  ]);

  return (
    <>
      <div className="w-full justify-between items-center flex py-2">
        {BackButton(currentStep, next, prev)}

        <div className="flex items-center gap-x-4">
          <BodyTextAlt>Your Information</BodyTextAlt>
          {isNumber(currentStep) && props?.totalSteps ? (
            <ProgressSteps
              currentStep={currentStep + 1}
              steps={props.totalSteps}
            />
          ) : null}
        </div>
      </div>
      <Header className={cx("mt-4 text-left", description ? "" : "mb-14")}>
        {title || `Let's get a quote in under 90 seconds.`}
      </Header>
      {description ? (
        <Subtitle className="text-left lg:mb-12">{description}</Subtitle>
      ) : (
        <> </>
      )}
    </>
  );
}
