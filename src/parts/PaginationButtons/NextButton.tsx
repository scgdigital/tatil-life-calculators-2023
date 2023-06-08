import Image from "next/image";
import rightArrow from "@/assets/svg/rightArrow.svg";
import { Button } from "@/components/Button";

export function NextButton(
  currentStep: number | null,
  next: () => void,
  prev: () => void
) {
  return (
    <div className="ml-auto mr-0 w-[120px]">
      <Button variant="primary" onClick={next} withArrow>
        Next
      </Button>
    </div>
  );
}
