import { FormWizard } from "@/parts/FormWizard/FormWizard";
import { WholeLifeHeader } from "@/parts/FormWizard/atoms";
import { NextButton } from "@/parts/PaginationButtons";
import { wholeLifeSteps } from "@/parts/products";
import { WholeLifeContent } from "@/parts/products/WholeLife/WholeLifeContent";

export default function WholeLifePage() {
  return (
    <main className="max-w-[590px] mx-auto">
      <WholeLifeContent />
    </main>
  );
}
