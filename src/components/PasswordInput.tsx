import { Child } from "hono/jsx";
import {
  GovUKPasswordInput,
  type GovUKPasswordInputProps,
} from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

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
      label={await renderChildFragment(label)}
      errorMessage={await renderChildFragment(errorMessage)}
      hint={await renderChildFragment(hint)}
      {...props}
    />
  );
}
