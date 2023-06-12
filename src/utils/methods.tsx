/* eslint-disable react/display-name */
export const withSibling =
  ({ ...props }: any) =>
  (...fns: any) => {
    return (
      <>
        {fns.map((fn: Function) => {
          return fn({ ...props });
        })}
      </>
    );
  };
