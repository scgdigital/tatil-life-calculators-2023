"use client";
import { useSpring, animated } from "react-spring";
import { useState } from "react";
import { cx } from "class-variance-authority";

type CheckboxProps = {
  onCheck?: (value: boolean) => void;
  value?: boolean;
  className?: string;
  [x: string]: any;
};

export function Checkbox({
  onCheck,
  value,
  className,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(value ?? false);

  const animation = useSpring({
    opacity: isChecked ? 1 : 0,
    backgroundColor: props?.disabled
      ? "#D9D9D9"
      : isChecked
      ? "#EE2127"
      : "transparent",
  });

  return (
    <label className="flex items-center space-x-3">
      <div className="relative">
        <input
          type="checkbox"
          className="opacity-0 absolute h-6 w-6"
          onChange={() => setIsChecked(!isChecked)}
          {...props}
        />
        <div
          className={cx(
            "border-2 w-6 h-6 flex items-center justify-center overflow-hidden transition-colors rounded",
            getBorderProperties(isChecked, props?.disabled)
          )}
        >
          <animated.div
            style={{
              ...animation,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 0,
            }}
          >
            <span className="text-white text-lg font-bold font-sans">✓</span>
          </animated.div>
        </div>
      </div>
    </label>
  );
}

const getBorderProperties = (isChecked: boolean, disabled: boolean) => {
  if (disabled) {
    return "border-tatil-gray cursor-not-allowed";
  }
  if (isChecked) {
    return "border-tatil-red";
  }
  return "border-tatil-black hover:border-tatil-palette-red-600 hover:bg-tatil-palette-red-50";
};
