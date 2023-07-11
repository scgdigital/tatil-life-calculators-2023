import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import { useState } from "react";
import { Input, MoneyInput } from "../Input";

interface ICoverAmount {
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  error: string | undefined;
  touched?: boolean | undefined;
  [key: string]: any;
}

export const CoverAmountInput = ({
  name,
  value,
  onChange,
  error,
  touched = false,
  ...props
}: ICoverAmount) => {
  return (
    <div className="w-full h-full flex flex-col lg:min-h-[100px] items-start">
      <div className="font-bold leading-6 text-left mb-2 lg:mb-6">
        Cover Amount
      </div>
      <CAInputComponent
        name={name}
        value={value}
        onChange={onChange}
        touched={touched}
        error={error}
        {...props}
      />
    </div>
  );
};

export const CAInputComponent = ({
  name,
  value,
  onChange,
  error,
  touched = false,
  ...props
}: ICoverAmount) => {
  const [inputFocus, setInputFocus] = useState(false);

  const handleFocus = () => {
    setInputFocus(true);
  };

  const handleBlur = () => {
    setInputFocus(false);
    if (!value) {
      onChange("0");
    }
  };

  const onButtonPress = (type: string) => {
    if (type === "add") {
      // Round to the nearest upper 1000 first if not rounded, then add 1000 on each click to the value
      if (+value % 2500 !== 0) {
        // Round to the nearest upper 1000
        const roundedValue = Math.ceil(+value / 2500) * 2500;
        console.log({ roundedValue });
        onChange(roundedValue.toString());
      } else {
        // Add 1000 to the value
        const newValue = (+value + 2500).toString();
        onChange(newValue);
      }
    }
    if (type === "substract") {
      // Round to the nearest lower 1000 first if not rounded, then substract 1000 on each click to the value
      if (+value % 2500 !== 0) {
        // Round to the nearest lower 1000
        const roundedValue = Math.floor(+value / 2500) * 2500;
        onChange(roundedValue.toString());
      } else {
        // Substract 1000 to the value as long its result is not negative, otherwise set it to 0
        const newValue = +value - 2500 > 0 ? (+value - 2500).toString() : "0";
        onChange(newValue);
      }
    }
  };

  return (
    <div
      className={cx(
        "flex group rounded-[12px] box-border border transition-color flex-grow-0 w-fit",
        inputFocus
          ? "border-tatil-black"
          : computeBorderStyle({ hasError: !!error, touched, value })
      )}
    >
      <button
        type="button"
        className="rounded-l-xl bg-tatil-lightgrey border-r border-tatil-grey w-[43px] h-[40px] flex justify-center items-center"
        onClick={() => onButtonPress("substract")}
      >
        <span className="text-[#777] font-semibold text-2xl">-</span>
      </button>
      <div className="bg-tatil-lightgrey border-r border-tatil-grey min-w-[122px] h-[40px]">
        <MoneyInput
          name={name}
          placeholder="$1,000,000"
          value={value}
          type="text"
          unstyled
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          {...props}
        />
      </div>
      <button
        type="button"
        className="rounded-r-xl bg-tatil-lightgrey border-tatil-grey w-[43px] h-[40px] flex justify-center items-center"
        onClick={() => onButtonPress("add")}
      >
        <span className="text-[#777] font-semibold text-2xl">+</span>
      </button>
    </div>
  );
};
