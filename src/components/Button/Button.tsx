"use client";
import { cva, cx } from "class-variance-authority";
import { createElement } from "react";
import rightArrow from "@/assets/svg/rightArrow.svg";
import Image from "next/image";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ghost";
  className?: string;
  withArrow?: boolean;
  [x: string]: any;
};

type disabledVariantProps =
  | "primary-true"
  | "secondary-true"
  | "primary-false"
  | "secondary-false"
  | "ghost-true"
  | "ghost-false";

const baseVariants = cva(
  "px-6 py-3 rounded font-bold transition-all group border-[1px]",
  {
    variants: {
      variant: {
        primary: "bg-tatil-red text-white",
        secondary: "bg-tatil-white text-tatil-red border-tatil-red",
        ghost: "bg-transparent text-tatil-black border-transparent",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const pseudoVariants = cva("", {
  variants: {
    combined: {
      "primary-true": "!bg-tatil-grey text-white cursor-not-allowed",
      "secondary-true":
        "bg-tatil-white !border-tatil-grey !text-tatil-grey cursor-not-allowed",
      "primary-false": "hover:bg-tatil-palette-red-600 active:bg-tatil-black",
      "secondary-false":
        "hover:!border-tatil-palette-red-600 hover:text-tatil-palette-red-600 active:!border-tatil-black active:text-tatil-black",
      "ghost-true": "text-tatil-grey cursor-not-allowed",
      "ghost-false": "hover:bg-tatil-palette-neutrals-50 active:bg-tatil-grey",
    },
  },
});

export const Button = ({
  children,
  className,
  withArrow = false,
  ...props
}: ButtonProps) => {
  const combined = (props?.variant +
    "-" +
    `${props?.disabled ?? false}`) as disabledVariantProps;
  return createElement(
    "button",
    Object.assign(
      {
        className: cx(
          baseVariants(props),
          pseudoVariants({ combined }),
          className
        ),
      },
      {
        ...props,
        type: props?.type || "button",
        onClick: props?.onClick && !props?.disabled ? props.onClick : () => {},
      }
    ),
    withArrow ? (
      <div className="flex items-center justify-between flex-wrap">
        <div>{children}</div>
        <Image
          src={rightArrow}
          width={4}
          height={8}
          className={cx(
            "w-2 h-4 ml-5",
            props.variant === "secondary" && "svg-fill-red",
            !props?.disabled
              ? "group-hover:translate-x-1 transition duration-300"
              : "",
            props.variant === "secondary" && props?.disabled && "svg-fill-grey"
          )}
          alt="right arrow next"
        />
      </div>
    ) : (
      children
    )
  );
};
