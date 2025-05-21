import { Child } from "hono/jsx";
import { type GovUKAccordionProps } from "../upstream/govuk";
export interface AccordionProps extends Omit<GovUKAccordionProps, "items"> {
    items: (AccordionItem | false | "" | null)[];
}
export interface AccordionItem {
    /** The heading of each accordion section. **/
    heading: Child;
    /** The summary line of each accordion section. **/
    summary?: Child;
    /** The content of each accordion section. **/
    content?: Child;
    /** Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`. **/
    expanded?: boolean;
}
export declare function Accordion({ items, ...props }: AccordionProps): Promise<import("hono/utils/html").HtmlEscapedString>;
