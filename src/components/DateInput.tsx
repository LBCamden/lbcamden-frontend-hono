import { Child } from "hono/jsx";
import GovUKDateInput, {
  type GovUKDateInputProps,
} from "govuk-frontend/dist/govuk/components/date-input/template.njk";

export interface DateInputProps extends Omit<GovUKDateInputProps, "formGroup"> {
  children?: Child;
}

export function DateInput(props: DateInputProps) {
  return <GovUKDateInput {...props} />;
}
