/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { useField } from "formik";
import { debounce } from "lodash-es";
import { useCallback, useState } from "react";

type InputProps = {
  name: string;
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  value: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
};

export function Input({
  name,
  type = "text",
  placeholder = "Lorem Ipsum",
  value,
  onChange,
  onBlur,
}: InputProps) {
  const [{}, { touched, error }] = useField(name);
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
          "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black shadow-sm"
        )}
      >
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="bg-transparent outline-none w-full"
          onChange={onChangeHandler}
          value={localValue}
          onBlur={debounce(() => {
            onBlur && onBlur();
          }, 300)}
        />
      </div>
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
