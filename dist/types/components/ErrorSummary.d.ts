import { Child } from "hono/jsx";
import { type GovUKErrorSummaryProps } from "../upstream/govuk";
export interface ErrorSummaryProps extends Omit<GovUKErrorSummaryProps, "errorList" | "titleText" | "titleHtml" | "descriptionText" | "descriptionHtml"> {
    title: Child;
    description?: Child;
    errorList?: ErrorSummaryItem[];
}
interface ErrorSummaryItem {
    /** Href attribute for the error link item. If provided item will be an anchor. **/
    href?: string;
    /** If `html` is set, this is not required. Text for the error link item. If `html` is provided, the `text` option will be ignored. **/
    content: Child;
    /** If `text` is set, this is not required. HTML for the error link item. If `html` is provided, the `text` option will be ignored. **/
    html: string;
    /** HTML attributes (for example data attributes) to add to the error link anchor. **/
    attributes?: Record<string, unknown>;
}
export declare function ErrorSummary({ title, description, ...props }: ErrorSummaryProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
