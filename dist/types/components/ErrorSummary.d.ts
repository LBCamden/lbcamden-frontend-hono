import { Child } from "hono/jsx";
import { type GovUKErrorSummaryProps } from "../upstream/govuk";
export interface ErrorSummaryProps extends Omit<GovUKErrorSummaryProps, "errorList" | "titleText" | "titleHtml" | "descriptionText" | "descriptionHtml"> {
    title: Child;
    description?: Child;
    errorList?: ErrorSummaryItem[];
}
interface ErrorSummaryItem {
    /** Text for the error link item. */
    content: Child;
    /** Href link for the error item. */
    href?: string;
    /** HTML attributes (for example data attributes) to add to the error link anchor. */
    attributes?: Record<string, unknown>;
}
export declare function ErrorSummary({ title, description, ...props }: ErrorSummaryProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
