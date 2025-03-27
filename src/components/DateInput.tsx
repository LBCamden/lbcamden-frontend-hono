import { Child } from "hono/jsx";
import { GovUKDateInput, type GovUKDateInputProps } from "../upstream/govuk";

export interface DateInputProps extends Omit<GovUKDateInputProps, "formGroup"> {
  children?: Child;
}

export function DateInput(props: DateInputProps) {
  return <GovUKDateInput {...props} />;
}
