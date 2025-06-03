import { Child } from "hono/jsx";
import { GovUKSelect, type GovUKSelectProps } from "../upstream/govuk";
import { HasEmbeddedContentArray } from "../types";
import { renderChildFragment, mapAsync } from "../lib/hono-jsx-utils";

export interface SelectProps
  extends Omit<
    GovUKSelectProps,
    "hint" | "label" | "errorMessage" | "fieldset" | "formGroup"
  > {
  hint?: Child;
  label?: Child;
  errorMessage?: Child;
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;

    /** Content to add before the select used by the select component. **/
    beforeInput?: Child;

    /** Content to add after the select used by the select component. **/
    afterInput?: Child;
  };
}

export async function Select({
  hint,
  label,
  errorMessage,
  formGroup,
  ...props
}: SelectProps) {
  return (
    <GovUKSelect
      {...props}
      label={await renderChildFragment(label)}
      hint={await renderChildFragment(hint)}
      errorMessage={await renderChildFragment(errorMessage)}
      formGroup={
        formGroup && {
          ...formGroup,
          beforeInput: await renderChildFragment(formGroup.beforeInput),
          afterInput: await renderChildFragment(formGroup.afterInput),
        }
      }
    />
  );
}
