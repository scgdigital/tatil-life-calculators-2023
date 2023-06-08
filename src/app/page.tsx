"use client";
import { Header } from "@/components/Typography";
import { FormWizard } from "@/parts/FormWizard/FormWizard";
import { WholeLifeHeader } from "@/parts/FormWizard/atoms";
import { NextButton } from "@/parts/PaginationButtons";
import { mockSteps } from "@/utils/mocks";

export default function Home() {
  return (
    <main className="max-w-[590px] mx-auto">
      <FormWizard
        header={WholeLifeHeader}
        footer={NextButton}
        steps={mockSteps}
      />
    </main>
  );
}
