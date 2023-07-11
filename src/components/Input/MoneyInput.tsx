import { useMemo, useRef } from "react";
import { ExtendableInput } from "./ExtendableInput";

export const MoneyInput = (props: any) => {
  const inputRef = useRef(null);

  const maskOptions = useMemo(
    () => ({
      // I need it to handle nums and null or undefined, its giving an error
      mask: `$num`,
      lazy: false,
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ",",
          scale: 2,
          signed: false,
          radix: ".",
          mapToRadix: ["."],
          min: 0,
        },
      },
    }),
    []
  );

  return (
    <ExtendableInput ref={inputRef} {...props} maskOptions={maskOptions} />
  );
};
