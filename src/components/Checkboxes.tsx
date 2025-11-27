import { Child, isValidElement } from "hono/jsx";
import { GovUKCheckboxes, type GovUKCheckboxesProps } from "../upstream/govuk";
import {
  renderChildFragment,
  mapAsync,
  isJsxChild,
} from "../lib/hono-jsx-utils";
import { compact } from "lodash-es";
import { ValueOfArray } from "../utils/types";
import { FieldsetOptions, fieldsetOptions } from "./Fieldset";

export interface CheckboxesProps
  extends Omit<
    GovUKCheckboxesProps,
    "formGroup" | "items" | "hint" | "errorMessage" | "fieldset"
  > {
  formGroup?: CheckboxesFormGroup;
  items: (CheckboxesItem | false | null | "")[];
  hint?: Child;
  errorMessage?: Child;
  fieldset?: FieldsetOptions;
}

export interface CheckboxesFormGroup {
  /** Classes to add to the form group (for example to show error state for the whole group). **/
  classes?: string;

  /** HTML attributes (for example data attributes) to add to the form group. **/
  attributes?: Record<string, unknown>;

  /** Content to add before all checkbox items within the checkboxes component. **/
  beforeInputs?: Child;

  /** Content to add after all checkbox items within the checkboxes component. **/
  afterInputs?: Child;
}

export type CheckboxesItem = { divider: string } | CheckboxesContentItem;

export interface CheckboxesContentItem {
  /** Content to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. **/
  content: Child;

  /** Specific ID attribute for the checkbox item. If omitted, then component global `idPrefix` option will be applied. **/
  id?: string;

  /** Specific name for the checkbox item. If omitted, then component global `name` string will be applied. **/
  name?: string;

  /** Value for the checkbox input. **/
  value: string | number;

  /** Subset of options for the label used by each checkbox item within the checkboxes component. **/
  label?: {
    /** Classes to add to the label tag. **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the label tag. **/
    attributes?: Record<string, unknown>;
  };

  /** Can be used to add a hint to each checkbox item within the checkboxes component. **/
  hint?: Child;

  /** Divider text to separate checkbox items, for example the text `"or"`. **/
  divider?: string;

  /** Whether the checkbox should be checked when the page loads. Takes precedence over the top-level `values` option. **/
  checked?: boolean;

  /** Provide additional content to reveal when the checkbox is checked. **/
  conditional?: Child;

  /** If set to `"exclusive"`, implements a 'None of these' type behaviour via JavaScript when checkboxes are clicked. **/
  behaviour?: "exclusive";

  /** If `true`, checkbox will be disabled. **/
  disabled?: boolean;

  /** HTML attributes (for example data attributes) to add to the checkbox input tag. **/
  attributes?: Record<string, unknown>;
}

export async function Checkboxes(props: CheckboxesProps) {
  const items = await mapAsync(
    compact(props.items),
    async (item): Promise<GovUKCheckboxesItem> => {
      if (isDivider(item)) return item as GovUKCheckboxesItem;

      const { content, conditional, hint, value, ...rest } = item;
      return {
        ...rest,
        hint: await renderChildFragment(hint),
        value: String(value),
        conditional: await renderChildFragment(conditional),
        ...(await renderChildFragment(content)),
      };
    }
  );

  return (
    <GovUKCheckboxes
      {...props}
      errorMessage={await renderChildFragment(props.errorMessage)}
      hint={await renderChildFragment(props.hint)}
      items={items}
      fieldset={await fieldsetOptions(props.fieldset)}
      formGroup={
        props.formGroup && {
          ...props.formGroup,
          afterInputs: await renderChildFragment(props.formGroup.afterInputs),
          beforeInputs: await renderChildFragment(props.formGroup.beforeInputs),
        }
      }
    />
  );
}

type GovUKCheckboxesItem = ValueOfArray<GovUKCheckboxesProps["items"]>;

function isDivider(x: any): x is { divider: string } {
  return "divider" in x && typeof x.divider === "string";
}

async function handleLegend(
  legend?: NonNullable<CheckboxesProps["fieldset"]>["legend"]
) {
  if (!legend) return;
  if (isJsxChild(legend)) {
    return renderChildFragment(legend);
  }

  return {
    ...legend,
    content: await renderChildFragment(legend.content),
  };
}
