import { Button } from "@/components/Button";
import { Question } from "@/parts/FormParts/Question";

export function MockStep() {
  return (
    <div className="flex flex-col w-full">
      <Question text={"Who are you getting this quote for?"} />
      <div className="flex gap-8 my-6">
        <Button variant="primary" withArrow onClick={() => {}}>
          Primary
        </Button>
        <Button variant="secondary" onClick={() => {}}>
          Secondary
        </Button>
      </div>
    </div>
  );
}
