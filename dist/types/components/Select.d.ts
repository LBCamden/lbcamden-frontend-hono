import { Child } from "hono/jsx";
import { type GovUKSelectProps } from "../upstream/govuk";
export interface SelectProps extends Omit<GovUKSelectProps, "hint" | "label" | "errorMessage" | "fieldset"> {
    hint?: Child;
    label?: Child;
    errorMessage?: Child;
}
export declare function Select({ hint, label, errorMessage, ...props }: SelectProps): Promise<import("hono/utils/html").HtmlEscapedString>;
