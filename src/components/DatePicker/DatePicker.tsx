"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import { computeBorderStyle } from "@/utils/styles";
import { cx } from "class-variance-authority";
import DatePickerComponent from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore error-next-line
import calendarIcon from "@/assets/svg/calendarIcon.svg?url";
import { format, isValid } from "date-fns";
import Image from "next/image";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { IMask, IMaskInput } from "react-imask";
import { useOnClickOutside } from "usehooks-ts";
import { DatePickerHeader } from "./atoms/DatePickerHeader";

type DatePickerProps = {
  value?: string;
  onDateChange?: (date: string) => void;
  touched?: boolean;
  error?: string;
};

export function DatePicker({
  value,
  onDateChange,
  touched,
  error,
}: DatePickerProps) {
  const [dialogPortal, setDialogPortal] = useState<React.ReactPortal | null>(
    null
  );
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  useOnClickOutside(dialogRef, () => {
    setIsDialogOpen(false);
  });
  const hasError = !!(touched && error);
  const borderStyle = computeBorderStyle({ hasError, touched, value });

  const maskOptions = useMemo(
    () => ({
      mask: Date, // enable date mask
      pattern: "d/`m/`Y", // Pattern mask with defined blocks
      blocks: {
        d: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
          maxLength: 2,
          placeholderChar: "D",
        },
        m: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
          maxLength: 2,
          placeholderChar: "M",
        },
        Y: {
          mask: IMask.MaskedRange,
          from: 1900,
          to: 9999,
          maxLength: 4,
          placeholderChar: "Y",
        },
      },
      format: function (date: Date) {
        let day = String(date.getDate());
        let month = String(date.getMonth() + 1);
        let year = String(date.getFullYear());

        if (+day < 10) {
          day = "0" + day;
        }
        if (+month < 10) {
          month = "0" + month;
        }

        return [day, month, year].join("/");
      },
      parse: function (str: string) {
        var dayMonthYear = str.split("/");
        return new Date(
          +dayMonthYear[2],
          +dayMonthYear[1] - 1,
          +dayMonthYear[0]
        );
      },
      min: new Date(1910, 0, 1),
      max: new Date(new Date().getFullYear() + 1, 0, 1),
      autofix: true,
      lazy: false,
      overwrite: true,
    }),
    []
  );

  useEffect(() => {
    if (isDialogOpen && document.getElementById("portal-root")) {
      const portal = createPortal(
        <DatePickerDialog
          isDialogOpen={isDialogOpen}
          value={value}
          onDateChange={onDateChange}
          touched={touched}
          error={error}
          dialogRef={dialogRef}
        />,
        document.getElementById("portal-root") as HTMLElement
      );
      setDialogPortal(portal);
    } else {
      setDialogPortal(null);
    }
  }, [isDialogOpen, value, onDateChange, touched, error]);

  return (
    <>
      <div
        className={cx(
          borderStyle,
          "flex relative bg-tatil-lightgrey w-full py-2 px-4 rounded-[12px] transition-all border-[1px] focus-within:border-tatil-black"
        )}
      >
        <IMaskInput
          {...maskOptions}
          ref={inputRef}
          type="text"
          className="bg-transparent outline-none w-full placeholder:text-[#9ea6b2]"
          onChange={() => {}}
          onAccept={(_, mask) => {
            if (mask.value && isValid(new Date(mask.value))) {
              if (onDateChange) {
                onDateChange(mask.value);
              }
            }
          }}
          value={value}
        />
        <button
          className="absolute top-1/2 -translate-y-1/2 right-3 transition-all duration-300 transform-gpu select-none"
          tabIndex={-1}
          onClick={() => {
            setIsDialogOpen((prev) => !prev);
          }}
          type="button"
        >
          <Image
            className="fill-current"
            src={calendarIcon}
            alt="dropdown arrow"
            width={16}
            height={16}
          />
        </button>
      </div>
      {dialogPortal}
      {hasError && (
        <div className="text-xs text-tatil-red mt-1 w-fit pl-4">{error}</div>
      )}
    </>
  );
}

// fn computeBorderStyle(hasError: boolean, touched: boolean, value: any) {

const DatePickerDialog = ({
  isDialogOpen,
  value,
  onDateChange,
  touched,
  error,
  dialogRef,
}: DatePickerProps & {
  isDialogOpen: boolean;
  dialogRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  return (
    <>
      <div
        className={cx(
          "fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-tatil-black bg-opacity-20 z-10",
          isDialogOpen
            ? "opacity-100 transition-all duration-500 delay-100"
            : "opacity-0"
        )}
      ></div>
      <div
        ref={dialogRef}
        className="bg-tranparent absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 m-0 z-20 scale-125"
      >
        <DatePickerComponent
          dateFormat={"dd/MM/yyyy"}
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
          selected={
            value &&
            isValid(
              new Date(
                Number(value?.split("/")[2] ?? 0),
                Number(value?.split("/")[1] ?? 0) - 1,
                Number(value?.split("/")[0] ?? 0)
              )
            )
              ? new Date(
                  Number(value?.split("/")[2]),
                  Number(value?.split("/")[1]) - 1,
                  Number(value?.split("/")[0])
                )
              : null
          }
          onChange={(date: Date) => {
            const newDate = format(date, "dd/MM/yyyy");
            if (onDateChange) {
              onDateChange(newDate);
            }
          }}
          renderCustomHeader={DatePickerHeader}
          inline
          dropdownMode="select"
          className="w-full h-full !bg-transparent"
          calendarClassName="h-full w-full !font-roboto !font-normal !select-none !font-light !text-[#1d1b20] px-[0.25rem] py-[1rem]"
        />
      </div>
    </>
  );
};
