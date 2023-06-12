/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { debounce } from "lodash-es";
import Image from "next/image";
import { ReactElement, useCallback, useEffect, useState } from "react";
import dropdownArrow from "@/assets/svg/rightArrow.svg";

type DropdownProps = {
  variant?: "primary" | "secondary" | "ghost";
  touched?: boolean;
  error?: string;
  initialValue: any;
  options: Array<Record<"id" | "label" | "value", any>>;
  onOptionChange?: (option: any) => void;
  syncValue?: any;
};

export function Dropdown({
  variant = "primary",
  touched,
  error,
  options = [],
  onOptionChange,
  initialValue,
  syncValue,
}: DropdownProps) {
  const [localValue, setValue] = useState<typeof initialValue>(
    initialValue || ""
  );

  useEffect(() => {
    if (syncValue && options.length) {
      const option = options.find((option) => option.value === syncValue);
      if (option) {
        setValue(option.label);
      }
    }
  }, [syncValue]);
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({
    hasError,
    touched,
    value: localValue,
  });

  const handleChange = (e: any) => {
    onOptionChange ? onOptionChange(e.target.value) : setValue(e.target.value);
  }

  const styles =
    variant === "ghost"
      ? "flex relative bg-transparent group items-center"
      : cx(
          "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black group",
          borderStyle,
          "focus:border-tatil-black focus-within:border-tatil-black"
        );

  return (
    <>
      <div className={styles}>
        <select
          className={cx(
            variant !== "ghost"
              ? "bg-transparent outline-none w-full"
              : "bg-transparent outline-none mr-[6px] px-2 text-[9px]  flex-shrink-0"
          )}
          onChange={handleChange}
          value={localValue}
        >
          {options.map((option, index) => (
            <option value={option.value} key={option.value + `${index}`}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          className={cx(
            variant !== "ghost"
              ? "absolute top-1/2 -translate-y-1/2 right-3 scale-75 rotate-[90deg] group-focus-within:rotate-[270deg] transition-all duration-300 transform-gpu"
              : "block rotate-[90deg] group-focus-within:rotate-[270deg] transition-all duration-300 transform-gpu m-0 p-0 w-[5px] h-[5px] flex-shrink-0"
          )}
        >
          <Image
            className="fill-current"
            src={dropdownArrow}
            alt="dropdown arrow"
            width={variant === "ghost" ? 5 : 16}
            height={variant === "ghost" ? 5 : 16}
          />
        </div>
      </div>
      {hasError && (
        <div className="text-xs text-tatil-red mt-1 w-fit pl-4">{error}</div>
      )}
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
