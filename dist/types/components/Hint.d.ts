import { Child } from "hono/jsx";
import { type GovUKHintProps } from "../upstream/govuk";
export interface HintProps extends Omit<GovUKHintProps, "text" | "html"> {
    children?: Child;
}
export declare function Hint({ children, ...props }: HintProps): Promise<import("hono/utils/html").HtmlEscapedString>;
