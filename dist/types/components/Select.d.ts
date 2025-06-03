import { Child } from "hono/jsx";
import { type GovUKSelectProps } from "../upstream/govuk";
export interface SelectProps extends Omit<GovUKSelectProps, "hint" | "label" | "errorMessage" | "fieldset" | "formGroup"> {
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
export declare function Select({ hint, label, errorMessage, formGroup, ...props }: SelectProps): Promise<import("hono/utils/html").HtmlEscapedString>;
