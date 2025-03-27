import { Child } from "hono/jsx";
import { type GovUKErrorMessageProps } from "../upstream/govuk";
export interface ErrorMessageProps extends Omit<GovUKErrorMessageProps, "text" | "html"> {
    children?: Child;
}
export declare function ErrorMessage(props: ErrorMessageProps): Promise<import("hono/utils/html").HtmlEscapedString>;
