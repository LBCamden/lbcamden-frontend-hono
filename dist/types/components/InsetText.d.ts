import { Child } from "hono/jsx";
import { type GovUKInsetTextProps } from "../upstream";
export interface InsetTextProps extends Omit<GovUKInsetTextProps, "text" | "html"> {
    children?: Child;
}
export declare function InsetText({ children, ...props }: InsetTextProps): Promise<import("hono/utils/html").HtmlEscapedString>;
