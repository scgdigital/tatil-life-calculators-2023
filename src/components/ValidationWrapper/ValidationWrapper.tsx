import { useAppSelector } from "@/store/hooks";
import { ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";

export const ValidationWrapper = ({
  children,
  names,
  show = false,
}: {
  children: React.ReactNode;
  names: string[];
  show?: boolean;
}) => {
  const errorLabels = useAppSelector((state) => state.enums.errorLabels);
  return (
    <div className="flex flex-col w-full items-start">
      {children}
      {show ? (
        names?.map((fieldName) => (
          <ErrorMessage name={fieldName} key={fieldName}>
            {(msg) => (
              <div className="list-item text-red-600 text-xs font-medium list-inside">
                <span className="capitalize">
                  {errorLabels?.[fieldName] ?? fieldName}
                </span>
                : {msg}
              </div>
            )}
          </ErrorMessage>
        ))
      ) : (
        <div className="min-h-[16px] w-full"></div>
      )}
    </div>
  );
};
