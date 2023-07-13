import { RevealWrapper } from "@/components/RevealWrapper/RevealWrapper";
import { ValidationWrapper } from "@/components/ValidationWrapper";
import { useAppDispatch } from "@/store/hooks";
import {
  setDescription,
  setTitle,
} from "@/store/slices/formConfigurationSlice";
import { useEffect } from "react";
import { useRevealingFields } from "../../hooks";
import { Input, PhoneInput } from "@/components/Input";
import { useFormikContext } from "formik";
import { CheckboxWithLabel } from "@/parts/FormParts";

export const Step4 = () => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext<any>();
  const dispatch = useAppDispatch();

  const { revealedFields } = useRevealingFields();
  useEffect(() => {
    dispatch(setTitle("Let's get a quote in under 90 seconds"));
    dispatch(setDescription(""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ValidationWrapper
        className="mb-3 lg:mb-6"
        show={revealedFields.includes("email")}
        names={["email"]}
      >
        <RevealWrapper
          show={revealedFields.includes("email")}
          names={["email"]}
        >
          <div className="font-bold leading-6 text-left mb-3 lg:mb-6 select-none">
            Your Email
          </div>
          <Input
            name="email"
            placeholder="@"
            value={values.email}
            onChange={(val) => {
              setFieldValue("email", val);
            }}
            type="email"
            onBlur={() => setFieldTouched("email", true, true)}
          />
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        className="mb-3 lg:mb-6"
        show={revealedFields.includes("phoneNumber")}
        names={["phoneNumber"]}
      >
        <RevealWrapper
          show={revealedFields.includes("phoneNumber")}
          names={["phoneNumber"]}
        >
          <div className="font-bold leading-6 text-left mb-3 lg:mb-6 select-none">
            Your Phone Number
          </div>
          <PhoneInput
            name="phoneNumber"
            placeholder="+1 868"
            value={values.phoneNumber}
            onChange={(val: string) => {
              setFieldValue("phoneNumber", val);
            }}
            type="text"
            onBlur={() => setFieldTouched("phoneNumber", true, true)}
          />
        </RevealWrapper>
      </ValidationWrapper>
      <ValidationWrapper
        show={revealedFields.includes("hasAgreed")}
        names={["hasAgreed"]}
      >
        <RevealWrapper
          show={revealedFields.includes("hasAgreed")}
          names={["hasAgreed"]}
        >
          <CheckboxWithLabel
            label="By proceeding you confirm that you have read and understand the Terms & Conditions of use and agree to be contacted about Tatil Life Products. "
            name="hasAgreed"
          />
        </RevealWrapper>
      </ValidationWrapper>
    </>
  );
};
