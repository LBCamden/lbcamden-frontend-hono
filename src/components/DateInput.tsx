import { Child } from "hono/jsx";
import { GovUKDateInput, type GovUKDateInputProps } from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";
import { ValueOfArray } from "../utils/types";

export interface DateInputProps
  extends Omit<
    GovUKDateInputProps,
    "formGroup" | "hint" | "errorMessage" | "items"
  > {
  /** Can be used to add a hint to a date input component. **/
  hint?: Child;

  /** Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Child;

  /** Additional options for the form group containing the date input component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;

    /** Content to add before the inputs used by the date input component. **/
    beforeInputs?: Child;

    /** Content to add after the inputs used by the date input component. **/
    afterInputs?: Child;
  };

  items?: Array<
    Omit<GovUkDateInputItem, "value"> & {
      value?: string | number;
      inputmode?: string;
    }
  >;
}

type GovUkDateInputItem = ValueOfArray<GovUKDateInputProps["items"]>;

export async function DateInput({
  hint,
  formGroup,
  errorMessage,
  ...props
}: DateInputProps) {
  return (
    <GovUKDateInput
      {...props}
      items={props.items as GovUkDateInputItem[]}
      hint={await renderChildFragment(hint)}
      errorMessage={await renderChildFragment(errorMessage)}
      formGroup={
        formGroup && {
          ...formGroup,
          beforeInputs: await renderChildFragment(formGroup.beforeInputs),
          afterInputs: await renderChildFragment(formGroup.afterInputs),
        }
      }
    />
  );
}
