import { cx } from "class-variance-authority";

export const H1 = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cx("text-[1.875rem] font-semibold", className)}>
    {children}
  </div>
);

export const H2 = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cx("text-[1.25rem] font-semibold", className)}>
    {children}
  </div>
);

export const BodyText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cx("text-[1.125rem]", className)}>{children}</div>;

export const BodyTextAlt = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cx("text-[1rem]", className)}>{children}</div>;
export const BodyTextAlt2 = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cx("text-[0.875rem] font-semibold", className)}>
    {children}
  </div>
);

export const ButtonText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cx("text-[1rem] font-semibold", className)}>{children}</div>
);

export const ButtonTextAlt = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cx("text-[1rem] font-bold", className)}>{children}</div>;
