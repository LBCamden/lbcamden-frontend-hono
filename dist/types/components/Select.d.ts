import { Child } from "hono/jsx";
import { type GovUKSelectProps } from "../upstream/govuk";
import { HasEmbeddedContentArray } from "../types";
export interface SelectProps extends Omit<GovUKSelectProps, "items" | "hint" | "errorMessage" | "fieldset"> {
    hint?: Child;
    errorMessage?: Child;
    items: HasEmbeddedContentArray<GovUKSelectProps["items"]>;
}
export declare function Select({ hint, errorMessage, ...props }: SelectProps): Promise<import("hono/utils/html").HtmlEscapedString>;
