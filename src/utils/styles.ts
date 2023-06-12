export function computeBorderStyle({
  hasError,
  touched,
  value,
}: {
  hasError: boolean;
  touched?: boolean;
  value: any;
}) {
  if (hasError && touched) {
    return "border-tatil-red";
  }

  if (value && !hasError) {
    return "border-tatil-green";
  }

  return "border-tatil-lightgrey";
}
