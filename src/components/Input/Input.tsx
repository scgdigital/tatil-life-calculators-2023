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
  value: any;
  onChange?: (value: any) => void;
};

export function Input({
  type = "text",
  placeholder = "Lorem Ipsum",
  touched,
  error,
  value,
  onChange,
}: InputProps) {
  const [localValue, setLocalValue] = useState(value ?? "");
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({ hasError, touched, value });

  const onChangeCallback = useCallback((value: string) => {
    setLocalValue(value);
    onChange && onChange(value);
  }, []);
  const onChangeHandler = (e: any) => {
    onChangeCallback(e.target.value);
  };

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
          onChange={onChangeHandler}
          value={localValue}
        />
      </div>
      {hasError && (
        <div className="text-xs text-tatil-red mt-1 w-fit pl-4">{error}</div>
      )}
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
