"use client";

import { ReactNode } from "react";
import { animated, useTransition } from "react-spring";

interface RevealWrapperProps {
  children: ReactNode;
  show: boolean;
}

export function RevealWrapper({ children, show }: RevealWrapperProps) {
  const transitions = useTransition(show, {
    from: { opacity: 0, transform: "translate3d(20%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    config: {
      duration: 350,
      easing: (t: number) => t * t * t,
    },
  });

  return transitions((styles, Component) =>
    show ? (
      <animated.div className="w-full flex-grow flex-shrink-0" style={styles}>
        {children}
      </animated.div>
    ) : null
  );
}
