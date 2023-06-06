/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { debounce } from "lodash-es";
import { useCallback, useState } from "react";

type InputProps = {
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  touched?: boolean;
  error?: string;
  initialValue: any;
};

export function Input({
  type = "text",
  placeholder = "Lorem Ipsum",
  touched,
  error,
  initialValue,
}: InputProps) {
  const [value, setValue] = useState<typeof initialValue>(initialValue || "");
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({ hasError, touched, value });

  const handleChange = debounce((e: any) => {
    setValue(e.target.value);
  }, 300);


  return (
    <>
      <div
        className={cx(
          borderStyle,
          "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black"
        )}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full"
          onChange={handleChange}
          defaultValue={String(value)}
        />
      </div>
      {hasError && (
        <div className="text-xs text-tatil-red mt-1 w-fit pl-4">{error}</div>
      )}
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
