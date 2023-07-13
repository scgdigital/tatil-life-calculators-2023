import { useAppSelector } from "@/store/hooks";
import { cx } from "class-variance-authority";
import { ErrorMessage } from "formik";
import debounce from "lodash-es/debounce";
import { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";

export const ValidationWrapper = ({
  className = "",
  children,
  names,
  show: originalShow = false,
}: {
  className?: string;
  children: React.ReactNode;
  names: string[];
  show?: boolean;
}) => {
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
    <div className={cx("flex flex-col w-full items-start gap-y-1", className)}>
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
