import { WithTooltip } from "@/components/Tooltip";
import { SmallHeader } from "@/components/Typography";
import { cx } from "class-variance-authority";
import { isEmpty } from "lodash-es";

export function Question({
  trackId,
  text,
  tooltip,
  className = "",
}: {
  text: string;
  tooltip?: {
    content?: string;
    children?: React.ReactNode;
  };
  trackId?: string;
  className?: string;
}) {
  return !isEmpty(tooltip) ? (
    <div
      className={cx(
        "flex gap-x-3 items-center flex-wrap md:flex-nowrap",
        className
      )}
    >
      <SmallHeader className="text-left">{text}</SmallHeader>
      <WithTooltip content={tooltip?.content}>
        {tooltip?.children ?? null}
      </WithTooltip>
    </div>
  ) : (
    <SmallHeader className="text-left">{text}</SmallHeader>
  );
}
