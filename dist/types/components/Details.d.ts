import { Child } from "hono/jsx";
import { type GovUKDetailsProps } from "../upstream";
export interface DetailsProps extends Omit<GovUKDetailsProps, "text" | "html" | "summaryText" | "summaryHtml"> {
    summary?: Child;
    children?: Child;
}
export declare function Details({ children, summary, ...props }: DetailsProps): Promise<import("hono/utils/html").HtmlEscapedString>;
