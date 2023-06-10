"use client";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { DatePicker } from "@/components/DatePicker";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import { Input } from "@/components/Input";
import { OptIns } from "@/components/OptIns";
import { ProgressSteps } from "@/components/ProgressSteps";
import { Toggle } from "@/components/Toggle";
import { mockOptions } from "@/utils/mocks";

export default function Home() {
  return (
    <main>
      Tatil Life Calculators
      <div className="flex flex-wrap justify-center gap-8 my-6">
        <Button variant="primary" withArrow onClick={() => {}}>
          Primary
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Secondary
        </Button>
        <Button variant="ghost" onClick={() => {}}>
          Ghost
        </Button>
        <Button variant="secondary" disabled withArrow onClick={() => {}}>
          Disabled
        </Button>
      </div>
      <div className="flex flex-wrap justify-center auto-rows-fr gap-8 my-6">
        <Button
          className="rounded-full"
          variant="primary"
          withArrow
          onClick={() => {}}
        >
          Primary
        </Button>
        <Button className="rounded-full" variant="secondary" onClick={() => {}}>
          Secondary
        </Button>
        <Button className="rounded-full" variant="ghost" onClick={() => {}}>
          Ghost
        </Button>
        <Button
          className="rounded-full"
          variant="secondary"
          disabled
          withArrow
          onClick={() => {}}
        >
          Disabled
        </Button>
      </div>
      <div className="my-6">
        <Toggle labels={["Label", "Label"]} value={false} />
      </div>
      <div className="my-6">
        <Checkbox value={true} />
      </div>
      <OptIns value={false} />
      <ProgressSteps currentStep={4} steps={7} />
      <div className="my-6">
        <Input placeholder="Input" initialValue="test" />
      </div>
      <div className="my-6">
        <Dropdown
          initialValue="test"
          options={mockOptions}
          touched
        />
      </div>
      <div className="my-6">
        <DatePicker />
      </div>
    </main>
  );
}