import { Child } from "hono/jsx";
import { type GovUKPaginationProps } from "../upstream";
export interface PaginationProps extends Omit<GovUKPaginationProps, "next" | "previous"> {
    next?: PaginationAnchor;
    previous?: PaginationAnchor;
}
export interface PaginationAnchor {
    /** The content of the link. Defaults to `"Previous page"`, with 'page' being visually hidden. **/
    content?: Child;
    /** The optional label that goes underneath the link, providing further context for the user about where the link goes. **/
    labelText?: string;
    /** The page's URL. **/
    href: string;
    /** The HTML attributes (for example, data attributes) you want to add to the anchor. **/
    attributes?: Record<string, unknown>;
}
export declare function Pagination(props: PaginationProps): Promise<import("hono/utils/html").HtmlEscapedString>;
