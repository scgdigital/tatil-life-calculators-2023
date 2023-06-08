import { Button } from "@/components/Button";

export function MockStep() {
  return (
    <div>
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
    </div>
  );
}
