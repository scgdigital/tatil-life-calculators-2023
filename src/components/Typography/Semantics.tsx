import { cx } from "class-variance-authority";

export const Header = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cx(
      "text-tatil-red font-semibold text-[1.375rem] lg:text-[1.875rem]",
      className
    )}
  >
    {children}
  </div>
);

export const Subtitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cx("font-light text-sm text-tatil-black leading-4 my-4", className)}
  >
    {children}
  </div>
);
