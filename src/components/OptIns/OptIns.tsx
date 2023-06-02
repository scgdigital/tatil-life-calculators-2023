import { cx } from "class-variance-authority";
import { useState } from "react";
import PlusIcon from "@/assets/svg/plusIcon.svg";
import MinusIcon from "@/assets/svg/minusIcon.svg";
import Image from "next/image";
type OptInsProps = {
  onToggle?: (value: boolean) => void;
  value: boolean;
  className?: string;
  [x: string]: any;
};

export const OptIns = ({
  onToggle,
  value,
  className,
  ...props
}: OptInsProps) => {
  const [checked, setChecked] = useState(value);

  const label = checked ? "Remove" : "Add";
  const toggle = () => {
    setChecked(!checked);
    if (onToggle) {
      onToggle(!checked);
    }
  };

  return (
    <button
      className={cx(
        "inline-block hover:scale-110 transition-all cursor-pointer",
        !checked && "hover:text-tatil-palette-red-600",
        !checked && "text-tatil-red"
      )}
      onClick={toggle}
    >
      <div className="font-bold text-3xl transition-all inline-block mr-2 align-middle">
        <Image src={checked ? MinusIcon : PlusIcon} alt="Plus Icon" />
      </div>
      <div className="inline-block align-middle">{label}</div>
    </button>
  );
};
