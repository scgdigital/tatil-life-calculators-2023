"use client";

import { useAppSelector } from "@/store/hooks";
import { cx } from "class-variance-authority";
import { useFormikContext } from "formik";
import { get } from "lodash-es";
import { ReactNode, useEffect, useRef } from "react";
import { animated, useTransition } from "react-spring";

interface RevealWrapperProps {
  className?: string;
  children: ReactNode;
  show: boolean;
  names?: string[];
}

export function RevealWrapper({
  className = "mt-2",
  children,
  show,
  names,
}: RevealWrapperProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const revealIndex =
    typeof window !== undefined
      ? Array.from(document.querySelectorAll(".reveal")).findIndex(
          (el) => el === elementRef.current
        )
      : null;

  const { setFieldTouched, errors, getFieldMeta, values } =
    useFormikContext<any>();
  const [prevStepNames, stepReached, revealsInStep, fieldIds, stepId] =
    useAppSelector((state) => [
      state.formConfiguration.prevFieldSet,
      state.formConfiguration.stepReached,
      state.formConfiguration.fieldIds[state.formConfiguration.stepId],
      state.formConfiguration.fieldIds,
      state.formConfiguration.stepId,
    ]);

  const transitions = useTransition(show, {
    from: {
      opacity: 0,
      transform: "translate3d(20%,0,0)",
      originX: "0%",
      originY: "0%",
    },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    config: {
      duration: 350,
      easing: (t: number) => t * t * t,
    },
    onStart: () => {
      if (show) {
        names?.forEach((name) => {
          setFieldTouched(name, false);
        });
      }
    },
    exitBeforeEnter: true,
  });
  const okToReveal =
    prevStepNames?.split(",")?.every((name: string) => {
      return (
        get(errors, name, null) === null && get(values, name, null) !== null
      );
    }) ||
    revealIndex === 0 ||
    revealsInStep[(revealIndex as number) - 1]
      ?.split(",")
      .every((name: string) => {
        return stepReached >
          Object.keys(fieldIds).findIndex((key) => key === stepId)
          ? true
          : get(errors, name, null) === null &&
              get(values, name, null) !== null;
      });

  return (
    <div className="reveal contents" ref={elementRef}>
      {transitions((styles, Component) =>
        show && okToReveal ? (
          <animated.div
            className={cx("w-full flex-grow flex-shrink-0", className)}
            style={styles}
          >
            {children}
          </animated.div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
