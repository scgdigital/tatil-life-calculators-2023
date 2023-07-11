/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { useField } from "formik";
import { debounce } from "lodash-es";
import { useCallback, useState } from "react";

type InputProps = {
  name: string;
  className?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  value: any;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  unstyled?: boolean;
};

export function Input({
  name,
  className,
  type = "text",
  placeholder = "Lorem Ipsum",
  value,
  onChange,
  onFocus,
  onBlur,
  unstyled,
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
          ...(!unstyled
            ? [
                borderStyle,
                "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black shadow-sm",
              ]
            : ["w-full h-full flex justify-center items-center text-center"]),
          className
        )}
      >
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={cx(
            "bg-transparent outline-none w-full focus:placeholder:text-transparent",
            unstyled && "text-center"
          )}
          onChange={onChangeHandler}
          value={localValue}
          onBlur={debounce(() => {
            onBlur && onBlur();
          }, 300)}
          onFocus={debounce(() => {
            onFocus && onFocus();
          })}
        />
      </div>
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
