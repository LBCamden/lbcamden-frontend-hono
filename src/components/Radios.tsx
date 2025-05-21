import { Child, JSXNode } from "hono/jsx";
import { GovUKRadios, type GovUKRadiosProps } from "../upstream/govuk";
import {
  renderChildFragment,
  mapAsync,
  renderHtml,
} from "../lib/hono-jsx-utils";
import { compact } from "lodash-es";

export interface RadiosProps
  extends Omit<
    GovUKRadiosProps,
    "fieldSet" | "hint" | "errorMessage" | "formGroup" | "items"
  > {
  hint?: Child;
  errorMessage?: Child;
  items: RadioItem[];
  children?: Child;

  /** Additional options for the form group containing the radios component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;

    /** Content to add before all radio items within the checkboxes component. **/
    beforeInputs?: Child;

    /** Content to add after all radio items within the checkboxes component. **/
    afterInputs?: Child;
  };
}

interface RadioItem {
  /** Text to use within each radio item label **/
  content: JSXNode;

  /** Specific ID attribute for the radio item. If omitted, then `idPrefix` string will be applied. **/
  id?: string;

  /** Value for the radio input. **/
  value: string;

  /** Subset of options for the label used by each radio item within the radios component. **/
  label?: {
    /** Classes to add to the label tag. **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the label tag. **/
    attributes?: Record<string, unknown>;
  };

  /** Can be used to add a hint to each radio item within the radios component. **/
  hint?: Child;

  /** Divider text to separate radio items, for example the text `"or"`. **/
  divider?: string;

  /** Whether the radio should be checked when the page loads. Takes precedence over the top-level `value` option. **/
  checked?: boolean;

  /** Provide additional content to reveal when the radio is checked. **/
  conditional?: Child;

  /** If `true`, radio will be disabled. **/
  disabled?: boolean;

  /** HTML attributes (for example data attributes) to add to the radio input tag. **/
  attributes?: Record<string, unknown>;
}

export async function Radios({
  fieldset,
  hint,
  errorMessage,
  formGroup,
  ...props
}: RadiosProps) {
  return (
    <GovUKRadios
      {...props}
      items={await mapAsync(
        compact(props.items),
        async ({ content, hint, conditional, ...rest }) => ({
          ...rest,
          ...(await renderChildFragment(content)),
          hint: await renderChildFragment(hint),
          conditional: await renderChildFragment(conditional),
        })
      )}
      formGroup={
        formGroup && {
          ...formGroup,
          beforeInputs: await renderChildFragment(formGroup.beforeInputs),
          afterInputs: await renderChildFragment(formGroup.afterInputs),
        }
      }
      hint={await renderChildFragment(hint)}
      errorMessage={await renderChildFragment(errorMessage)}
    />
  );
}
