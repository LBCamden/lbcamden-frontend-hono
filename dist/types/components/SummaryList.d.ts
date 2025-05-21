import { Child } from "hono/jsx";
import { type GovUKSummaryListProps } from "../upstream";
export interface SummaryListProps extends Omit<GovUKSummaryListProps, "rows" | "card"> {
    /** The rows within the summary list component. **/
    rows: SummaryListRow[];
    /** Can be used to wrap a summary card around the summary list component. If any of these options are present, a summary card will wrap around the summary list. **/
    card?: {
        /** Data for the summary card header. **/
        title?: Child | {
            /** Content to use within each title. **/
            content?: Child;
            /** Heading level, from `1` to `6`. Default is `2`. **/
            headingLevel?: number;
            /** Classes to add to the title wrapper. **/
            classes?: string;
        };
        /** The action link content shown in the header of each summary card wrapped around the summary list component. **/
        actions?: {
            /** The action link items shown in the header within the summary card wrapped around the summary list component. **/
            items?: Array<SummaryListRowActionItem>;
            /** Classes to add to the actions wrapper. **/
            classes?: string;
        };
        /** Classes to add to the container. **/
        classes?: string;
        /** HTML attributes (for example data attributes) to add to the container. **/
        attributes?: Record<string, unknown>;
    };
}
interface SummaryListRow {
    /** Classes to add to the row `div`. **/
    classes?: string;
    /** The reference content (key) for each row item in the summary list component. **/
    key: Child | SummaryListKeyValue;
    /** The value for each row item in the summary list component. **/
    value: Child | SummaryListKeyValue;
    /** The action link content for each row item in the summary list component. **/
    actions?: {
        /** The action link items within the row item of the summary list component. **/
        items?: SummaryListRowActionItem[];
        /** Classes to add to the actions wrapper. **/
        classes?: string;
    };
}
interface SummaryListRowActionItem {
    /** The value of the link's `href` attribute for an action item. **/
    href: string;
    /** Content to use within each action item. **/
    content: string;
    /** Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios. **/
    visuallyHiddenText?: string;
    /** Classes to add to the action item. **/
    classes?: string;
    /** HTML attributes (for example data attributes) to add to the action item. **/
    attributes?: Record<string, unknown>;
}
interface SummaryListKeyValue {
    /** Content to use within item. **/
    content: Child;
    /** Classes to add to the wrapper. **/
    classes?: string;
}
export declare function SummaryList(props: SummaryListProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
