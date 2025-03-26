import { Child } from "hono/jsx";
import GovUKTextarea, {
  type GovUKTextareaProps,
} from "govuk-frontend/dist/govuk/components/textarea/template.njk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface TextareaProps
  extends Omit<
    GovUKTextareaProps,
    "label" | "hint" | "errorMessage" | "formGroup"
  > {
  label: Child;
  hint?: Child;
  errorMessage?: Child;
}

export async function Textarea({
  label,
  hint,
  errorMessage,
  ...props
}: TextareaProps) {
  return (
    <GovUKTextarea
      {...props}
      label={await honoTextOrHtmlToGovUK(label)}
      hint={await honoTextOrHtmlToGovUK(hint)}
      errorMessage={await honoTextOrHtmlToGovUK(errorMessage)}
    />
  );
}
