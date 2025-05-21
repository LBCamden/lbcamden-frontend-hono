import { Child } from "hono/jsx";
import { type GovUKTaskListProps } from "../upstream";
export interface TaskListProps extends Omit<GovUKTaskListProps, "items"> {
    items: TaskListItem[];
}
interface TaskListItem {
    /** The main title for the task within the task list component. **/
    title: Child | {
        /** Content to use within the title. **/
        content: Child;
        /** Classes to add to the title wrapper. **/
        classes?: string;
    };
    /** Can be used to add a hint to each task within the task list component. **/
    hint?: Child;
    /** The status for each task within the task list component. **/
    status: {
        /** Can be used to add a tag to the status of the task within the task list component. **/
        tag?: Child | {
            content?: Child;
            classes?: string[];
        };
        /** Content to use for the status, as an alternative to using a tag. **/
        content: Child;
        /** Classes to add to the status container. **/
        classes?: string;
    };
    /** The value of the link’s `href` attribute for the task list item. **/
    href?: string;
    /** Classes to add to the item `div`. **/
    classes?: string;
}
export declare function TaskList(props: TaskListProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
