/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { debounce } from "lodash-es";
import Image from "next/image";
import { ReactElement, useCallback, useState } from "react";
import dropdownArrow from "@/assets/svg/rightArrow.svg";

type DropdownProps = {
  placeholder: string;
  touched?: boolean;
  error?: string;
  initialValue: any;
  options: Array<Record<"id" | "label" | "value", any>>;
};

export function Dropdown({
  placeholder = "Lorem Ipsum",
  touched,
  error,
  options = [],
  initialValue,
}: DropdownProps) {
  const [value, setValue] = useState<typeof initialValue>(initialValue || "");
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({ hasError, touched, value });

  const handleChange = useCallback(
    debounce((e: any) => {
      setValue(e.target.value);
    }, 300),
    []
  );

  return (
    <>
      <div
        className={cx(
          "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black group",
          borderStyle,
          "focus:border-tatil-black focus-within:border-tatil-black"
        )}
      >
        <select
          className="bg-transparent outline-none w-full"
          onChange={handleChange}
        >
          {options.map((option, index) => (
            <option value={option.value} key={option.value + `${index}`}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 scale-75 rotate-[90deg] group-focus-within:rotate-[270deg] transition-all duration-300 transform-gpu">
          <Image
            className="fill-current"
            src={dropdownArrow}
            alt="dropdown arrow"
            width={16}
            height={16}
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
