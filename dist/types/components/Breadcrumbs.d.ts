import { Child } from "hono/jsx";
import { type GovUKBreadcrumbsProps } from "../upstream/govuk";
export interface BreadcrumbsProps extends Omit<GovUKBreadcrumbsProps, "items"> {
    items: BreadcrumbItem[];
}
export interface BreadcrumbItem {
    content: Child;
    /** HTML attributes (for example data attributes) to add to the individual crumb. **/
    attributes?: Record<string, unknown>;
    /** Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item. **/
    href?: string;
}
export declare function Breadcrumbs({ items, ...props }: BreadcrumbsProps): Promise<import("hono/utils/html").HtmlEscapedString>;
