import { getMonth, getYear } from "date-fns";
import { range } from "lodash-es";
// @ts-ignore error-next-line
import chevronRight from "@/assets/svg/rightArrow.svg?url";
import Image from "next/image";
import { Dropdown } from "@/components/Dropdown/Dropdown";

const years = range(1920, getYear(new Date()) + 1, 1);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: any) => {
  return (
    <div className="w-full flex justify-between px-3 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="flex-shrink-0"
      >
        <Image
          src={chevronRight}
          width={6}
          height={6}
          className="rotate-180"
          alt="previous-month"
        />
      </button>
      <div className="gap-x-4 flex-grow-0 flex items-center text-xs">
        <Dropdown
          variant="ghost"
          initialValue={months[getMonth(date)]}
          onOptionChange={(option: string | number) => {
            changeMonth(months.indexOf(String(option)));
          }}
          options={
            months.map((option) => ({
              id: option,
              label: option,
              value: option,
            })) || []
          }
          syncValue={months[getMonth(date)]}
        />
        <Dropdown
          variant="ghost"
          initialValue={getYear(date)}
          onOptionChange={(option: string | number) => {
            changeYear(option);
          }}
          options={
            years
              .map((option) => ({
                id: option,
                label: option,
                value: option,
              }))
              .sort((a, b) => {
                return b.value - a.value;
              }) || []
          }
          syncValue={getYear(date)}
        />
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="flex-shrink-0"
      >
        <Image src={chevronRight} width={6} height={6} alt="previous-month" />
      </button>
    </div>
  );
};
