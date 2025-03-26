import { Child } from "hono/jsx";
import GovUKInput, {
  type GovUKInputProps,
} from "govuk-frontend/dist/govuk/components/input/template.njk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface InputProps
  extends Omit<
    GovUKInputProps,
    "label" | "hint" | "prefix" | "suffix" | "formGroup" | "errorMessage"
  > {
  label: Child;
  hint?: Child;
  errorMessage?: Child;
  prefix?: InputAttachment;
  suffix?: InputAttachment;
}

interface InputAttachment {
  content: Child;

  /** Classes to add to the element. **/
  classes?: string;

  /** HTML attributes (for example data attributes) to add to the element. **/
  attributes?: Record<string, unknown>;
}

export async function Input({
  label,
  hint,
  prefix,
  suffix,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <GovUKInput
      {...props}
      prefix={await convertAttachment(prefix)}
      suffix={await convertAttachment(suffix)}
      label={await honoTextOrHtmlToGovUK(label)}
      errorMessage={await honoTextOrHtmlToGovUK(errorMessage)}
      hint={await honoTextOrHtmlToGovUK(hint)}
    />
  );
}

async function convertAttachment(params: InputAttachment | undefined) {
  if (!params) return;

  const { content, ...rest } = params;
  return {
    ...rest,
    ...(await honoTextOrHtmlToGovUK(content)),
  };
}
