import { Child } from "hono/jsx";
import {
  GovUKPasswordInput,
  type GovUKPasswordInputProps,
} from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface PasswordInputProps
  extends Omit<
    GovUKPasswordInputProps,
    "label" | "hint" | "formGroup" | "errorMessage"
  > {
  label: Child;
  hint?: Child;
  errorMessage?: Child;
}

export async function PasswordInput({
  label,
  hint,
  errorMessage,
  ...props
}: PasswordInputProps) {
  return (
    <GovUKPasswordInput
      label={await honoTextOrHtmlToGovUK(label)}
      errorMessage={await honoTextOrHtmlToGovUK(errorMessage)}
      hint={await honoTextOrHtmlToGovUK(hint)}
      {...props}
    />
  );
}
