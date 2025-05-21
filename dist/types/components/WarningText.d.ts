import { Child } from "hono/jsx";
import { type GovUKWarningTextProps } from "../upstream";
export interface WarningTextProps extends Omit<GovUKWarningTextProps, "html" | "text"> {
    children?: Child;
}
export declare function WarningText({ children, ...props }: WarningTextProps): Promise<import("hono/utils/html").HtmlEscapedString>;
