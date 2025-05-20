import { Child } from "hono/jsx";
import {
  GovUKCharacterCount,
  type GovUKCharacterCountProps,
} from "../upstream";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface CharacterCountProps
  extends Omit<GovUKCharacterCountProps, "label" | "hint" | "formGroup"> {
  label?: Child;
  hint?: Child;
  formGroup?: CharacterCountFormGroup;
}

export interface CharacterCountFormGroup {
  /** Classes to add to the form group (for example to show error state for the whole group). **/
  classes?: string;

  /** HTML attributes (for example data attributes) to add to the form group. **/
  attributes?: Record<string, unknown>;

  /** Content to add before the textarea used by the character count component. **/
  beforeInput?: Child;

  /** Content to add after the textarea used by the character count component. **/
  afterInput?: Child;
}

export async function CharacterCount(props: CharacterCountProps) {
  const label = await honoTextOrHtmlToGovUK(props.label);
  const hint = await honoTextOrHtmlToGovUK(props.hint);

  return (
    <GovUKCharacterCount
      {...props}
      label={label}
      hint={hint}
      formGroup={{
        ...props.formGroup,
        beforeInput: await honoTextOrHtmlToGovUK(props.formGroup?.beforeInput),
        afterInput: await honoTextOrHtmlToGovUK(props.formGroup?.afterInput),
      }}
    />
  );
}
