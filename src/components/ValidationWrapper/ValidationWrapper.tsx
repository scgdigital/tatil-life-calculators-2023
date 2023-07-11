import { useAppSelector } from "@/store/hooks";
import { ErrorMessage, useFormikContext } from "formik";
import { animated, useTransition } from "react-spring";
import { useEffect, useState, useRef } from "react";
import debounce from "lodash-es/debounce";

export const ValidationWrapper = ({
  children,
  names,
  show: originalShow = false,
}: {
  children: React.ReactNode;
  names: string[];
  show?: boolean;
}) => {
  const { getFieldMeta } = useFormikContext<any>();
  const [show, setShow] = useState(originalShow);
  const debouncedShow = useRef(
    debounce((value) => setShow(value), 300)
  ).current; // 500ms debounce

  useEffect(() => {
    debouncedShow(originalShow);
    // Cleanup function
    return () => {
      debouncedShow.cancel();
    };
  }, [originalShow, debouncedShow]);

  const transitions = useTransition(show, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: "auto" },
    config: {
      duration: 750,
      easing: (t: number) => t * t * t,
    },
  });

  const errorLabels = useAppSelector((state) => state.enums.errorLabels);
  return (
    <div className="flex flex-col w-full items-start">
      {children}
      {transitions((styles, item) => {
        return item && show ? (
          <animated.div style={styles} className="contents">
            {names?.map((fieldName) => (
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
            ))}
          </animated.div>
        ) : null;
      })}
    </div>
  );
};
