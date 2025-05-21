import { Child } from "hono/jsx";
import { GovUKFileUpload, type GovUKFileUploadProps } from "../upstream/govuk";
import { renderChildFragment, renderHtml } from "../lib/hono-jsx-utils";

export interface FileUploadProps
  extends Omit<
    GovUKFileUploadProps,
    "formGroup" | "label" | "hint" | "errorMessage" | "multipleFilesChosenText"
  > {
  /** The label used by the file upload component. **/
  label: Child;

  /** Can be used to add a hint to the file upload component. **/
  hint?: Child;

  /** Can be used to add an error message to the file upload component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Child;

  /** Additional options for the form group containing the file upload component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;

    /** Content to add before the input used by the file upload component. **/
    beforeInput?: Child;

    /** Content to add after the input used by the file upload component. **/
    afterInput?: Child;
  };

  /** The text displayed when multiple files have been chosen by the user. The component will replace the `%{count}` placeholder with the number of files selected. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). If `javascript` is not provided, this option will be ignored. **/
  multipleFilesChosenText?: Child;
}

export async function FileUpload({
  label,
  hint,
  errorMessage,
  formGroup,
  multipleFilesChosenText,
  ...props
}: FileUploadProps) {
  return (
    <GovUKFileUpload
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
      multipleFilesChosenText={await renderChildFragment(
        multipleFilesChosenText
      )}
    />
  );
}
