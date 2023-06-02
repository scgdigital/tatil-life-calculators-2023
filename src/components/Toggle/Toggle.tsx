"use client";
import { cx } from "class-variance-authority";
import { isEmpty } from "lodash-es";
import { useState } from "react";

type CheckboxProps = {
  labels: FixedLengthArray<string, 2>;
  className?: string;
  [x: string]: any;
};

export const Toggle = ({
  labels,
  className,
  value,
  onToggle,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(value);
  const toggle = () => {
    setChecked(!checked);
    if (onToggle) {
      onToggle(!checked);
    }
  };
  return (
    <div
      className={cx(
        props?.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <div
        className={cx("gap-x-1 inline-flex relative items-center", className)}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          {...props}
        />
        <div
          onClick={() => {
            if (props?.disabled) return;
            setChecked(!checked);
          }}
          className={`w-11 h-6 bg-gray-200 rounded-full peerpeer-focus:ring-green-300 
            peer-checked:after:translate-x-[calc(100%+4px)] peer-checked:after:border-white after:content-[''] 
            after:absolute after:top-[3px] after:left-[2px] after:bg-white after:border-gray-300 
            after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all transition-all peer-checked:bg-tatil-red duration-300 after:duration-300`}
        ></div>
      </div>
    </div>
  );
};
