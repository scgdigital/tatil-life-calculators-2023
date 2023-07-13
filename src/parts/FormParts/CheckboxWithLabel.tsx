import { Checkbox } from "@/components/Checkbox";
import { useField } from "formik";

export const CheckboxWithLabel = ({
  name,
  label = "By proceeding you confirm that you have read and understand the Terms & Conditions of use and agree to be contacted about Tatil Life Products.",
}: {
  name: string;
  label: string;
}) => {
  const [, { value, touched, error }, { setValue }] = useField(name);
  return (
    <div className="flex gap-x-2 items-start mt-2">
      <Checkbox
        className="mt-1"
        disabled={false}
        error={error}
        touched={touched}
        value={value}
        onCheck={(val: boolean) => {
          setValue(val);
        }}
      />
      <div className="text-sm font-normal text-left">
        <label htmlFor={name}>{label}</label>
      </div>
    </div>
  );
};
