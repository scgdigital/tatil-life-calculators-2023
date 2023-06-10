import { Button } from "@/components/Button";
import { cx } from "class-variance-authority";
import { useState } from "react";

export const SideBySideButtons = ({
  labels,
  onClick,
  disabled,
  className,
}: {
  labels: string[];
  onClick: (label: string) => void;
  disabled?: boolean;
  className?: string;
}) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full flex gap-x-5 items-center select-none">
      {labels.map((label, index) => {
        return (
          <button
            key={index}
            className={cx(
              "w-full flex-1 bg-tatil-grey text-tatil-black rounded-xl flex justify-center items-center py-3 font-bold transition-all",
              selected === index
                ? "!bg-tatil-red text-white"
                : "hover:outline hover:outline-tatil-red"
            )}
            onClick={() => {
              setSelected(index);
              onClick(label);
            }}
            disabled={disabled}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
