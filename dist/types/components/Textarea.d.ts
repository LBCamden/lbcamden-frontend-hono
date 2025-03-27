import { Child } from "hono/jsx";
import { type GovUKTextareaProps } from "../upstream/govuk";
export interface TextareaProps extends Omit<GovUKTextareaProps, "label" | "hint" | "errorMessage" | "formGroup"> {
    label: Child;
    hint?: Child;
    errorMessage?: Child;
}
export declare function Textarea({ label, hint, errorMessage, ...props }: TextareaProps): Promise<import("hono/utils/html").HtmlEscapedString>;
