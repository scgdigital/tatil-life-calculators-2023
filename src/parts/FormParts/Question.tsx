import { WithTooltip } from "@/components/Tooltip";
import { SmallHeader } from "@/components/Typography";
import { isEmpty } from "lodash-es";

export function Question({
  text,
  tooltip,
}: {
  text: string;
  tooltip?: {
    content?: string;
    children?: React.ReactNode;
  };
}) {
  return !isEmpty(tooltip) ? (
    <div className="flex gap-x-3 items-center">
      <SmallHeader className="text-left">{text}</SmallHeader>
      <WithTooltip content={tooltip?.content}>
        {tooltip?.children ?? null}
      </WithTooltip>
    </div>
  ) : (
    <SmallHeader className="text-left">{text}</SmallHeader>
  );
}
