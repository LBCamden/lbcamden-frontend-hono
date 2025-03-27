import { Child } from "hono/jsx";
import { type GovUKPasswordInputProps } from "../upstream/govuk";
export interface PasswordInputProps extends Omit<GovUKPasswordInputProps, "label" | "hint" | "formGroup" | "errorMessage"> {
    label: Child;
    hint?: Child;
    errorMessage?: Child;
}
export declare function PasswordInput({ label, hint, errorMessage, ...props }: PasswordInputProps): Promise<import("hono/utils/html").HtmlEscapedString>;
