import { Child } from "hono/jsx";
import { GovUKTextarea, type GovUKTextareaProps } from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";
import { labelOpts, LabelOpts } from "./Label";

export interface TextareaProps
  extends Omit<
    GovUKTextareaProps,
    "label" | "hint" | "errorMessage" | "formGroup"
  > {
  label: LabelOpts | Child;
  hint?: Child;
  errorMessage?: Child;
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;
    beforeInput?: Child;
    afterInput?: Child;
  };
}

export async function Textarea({
  label,
  hint,
  errorMessage,
  formGroup,
  ...props
}: TextareaProps) {
  return (
    <GovUKTextarea
      {...props}
      label={await labelOpts(label)}
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
