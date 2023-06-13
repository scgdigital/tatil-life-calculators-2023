import Image from "next/image";
// @ts-ignore
import rightArrow from "@/assets/svg/rightArrow.svg?url";
import { cx } from "class-variance-authority";

export function BackButton(
  currentStep: number | null,
  next: () => void,
  prev: () => void
) {
  return (
    <button
      className={cx(
        "flex items-center gap-x-4",
        (currentStep as number) > 0 ? "greyscale" : ""
      )}
      onClick={prev}
      type="button"
      role="back-button"
      disabled={!((currentStep as number) > 0)}
    >
      <Image
        src={rightArrow}
        className={cx("rotate-180 text-tatil-black")}
        width={10}
        height={10}
        alt="back-arrow"
      />
      <div className="text-tatil-grey">Back</div>
    </button>
  );
}
