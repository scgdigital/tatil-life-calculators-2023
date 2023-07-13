/* eslint-disable react-hooks/exhaustive-deps */
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { useField } from "formik";
import { debounce, isEmpty, isString, omit } from "lodash-es";
import { useCallback, useState } from "react";
import { IMaskInput } from "react-imask/esm/index";

type InputProps = {
  name: string;
  className?: string;
  prefix?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder: string;
  value: any;
  onChange?: (value: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  unstyled?: boolean;
  [key: string]: any;
};

export function ExtendableInput(props: InputProps) {
  const [{}, { touched, error }] = useField(props.name);
  const [localValue, setLocalValue] = useState(props.value ?? "");
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({
    hasError: !!props?.error,
    touched: props.touched,
    value: props.value,
  });

  const onChangeCallback = useCallback((value: string) => {
    setLocalValue(value);
    props?.onChange && props.onChange(value || "");
  }, []);

  const onChangeHandler = (e: any) => {
    if (isString(e.target.value)) {
      onChangeCallback(e.target.value || "");
    }
  };

  return (
    <>
      <div
        className={cx(
          ...(!props?.unstyled
            ? [
                borderStyle,
                "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black shadow-sm",
              ]
            : ["w-full h-full flex justify-center items-center text-center"]),
          props.className
        )}
      >
        {" "}
        {props?.prefix ? (
          <div className="font-bold">{props.prefix}</div>
        ) : (
          <></>
        )}
        {!isEmpty(props?.maskOptions) ? (
          <IMaskInput
            {...props}
            {...props.maskOptions}
            className={cx(
              "bg-transparent outline-none w-full focus:placeholder:text-transparent",
              props?.unstyled && "text-center"
            )}
            onAccept={(_, mask) => {
              onChangeCallback(
                isString(mask.unmaskedValue) ? mask.unmaskedValue : ""
              );
            }}
          />
        ) : (
          <input
            {...props}
            name={props?.name}
            type={props?.type}
            className={cx(
              "bg-transparent outline-none w-full focus:placeholder:text-transparent",
              props?.unstyled && "text-center"
            )}
            onChange={onChangeHandler}
            value={localValue ?? ""}
            onBlur={debounce(() => {
              props?.onBlur && props?.onBlur();
            }, 300)}
            onFocus={debounce(() => {
              props?.onFocus && props?.onFocus();
            })}
          />
        )}
      </div>
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {
