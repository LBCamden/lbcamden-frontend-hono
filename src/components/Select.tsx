import { Child } from "hono/jsx";
import { GovUKSelect, type GovUKSelectProps } from "../upstream/govuk";
import { HasEmbeddedContentArray } from "../types";
import { renderChildFragment, mapAsync } from "../lib/hono-jsx-utils";

export interface SelectProps
  extends Omit<
    GovUKSelectProps,
    "hint" | "label" | "errorMessage" | "fieldset"
  > {
  hint?: Child;
  label?: Child;
  errorMessage?: Child;
}

export async function Select({
  hint,
  label,
  errorMessage,
  ...props
}: SelectProps) {
  return (
    <GovUKSelect
      {...props}
      label={await renderChildFragment(label)}
      hint={await renderChildFragment(hint)}
      errorMessage={await renderChildFragment(errorMessage)}
    />
  );
}
