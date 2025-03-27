import { Child } from "hono/jsx";
import { type GovUKInputProps } from "../upstream/govuk";
export interface InputProps extends Omit<GovUKInputProps, "label" | "hint" | "prefix" | "suffix" | "formGroup" | "errorMessage"> {
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
export declare function Input({ label, hint, prefix, suffix, errorMessage, ...props }: InputProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
