"use client";
import { Button } from "@/components/Button";
import { cx } from "class-variance-authority";
import { useState } from "react";

export const SideBySideButtons = ({
  value = null,
  labels,
  onClick,
  disabled,
  className,
}: {
  value?: string | null;
  labels: string[];
  onClick: (label: string) => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <div className="w-full flex gap-x-5 items-center select-none">
      {labels.map((label, index) => {
        return (
          <button
            type="button"
            key={label + "-" + index}
            className={cx(
              "w-full flex-1 bg-tatil-grey text-tatil-black rounded-xl flex justify-center items-center py-3 font-bold transition-all",
              labels.indexOf(value as string) === index
                ? "!bg-tatil-red text-white"
                : "hover:outline hover:outline-tatil-red"
            )}
            onClick={() => {
              onClick(label);
            }}
            disabled={disabled}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};
