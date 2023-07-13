import { useMemo, useRef } from "react";
import { ExtendableInput } from "./ExtendableInput";

export const PhoneInput = (props: any) => {
  const inputRef = useRef(null);

  const maskOptions = useMemo(
    () => ({
      // I need it to handle nums and null or undefined, its giving an error
      mask: [
        {
          mask: "(000) 000-0000",
        },
      ],
      lazy: false,
    }),
    []
  );

  return (
    <ExtendableInput ref={inputRef} {...props} maskOptions={maskOptions} />
  );
};
