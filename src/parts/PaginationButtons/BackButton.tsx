import Image from "next/image";
import rightArrow from "@/assets/svg/rightArrow.svg";

export function BackButton(
  currentStep: number | null,
  next: () => void,
  prev: () => void
) {
  return (
    <button className="flex items-center gap-x-4" onClick={prev}>
      <Image
        src={rightArrow}
        className="rotate-180 grayscale"
        width={10}
        height={10}
        alt="back-arrow"
      />
      <div className="text-tatil-grey">Back</div>
    </button>
  );
}
