import { Child } from "hono/jsx";
import { type GovUKPanelProps } from "../upstream/govuk";
export interface PanelProps extends Omit<GovUKPanelProps, "text" | "html" | "titleText" | "titleHtml"> {
    title: Child;
    children?: Child;
}
export declare function Panel({ title, children, ...props }: PanelProps): Promise<import("hono/utils/html").HtmlEscapedString>;
