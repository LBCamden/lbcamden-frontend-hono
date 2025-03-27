import { Child, JSXNode } from "hono/jsx";
import { type GovUKRadiosProps } from "../upstream/govuk";
export interface RadiosProps extends Omit<GovUKRadiosProps, "fieldSet" | "hint" | "errorMessage" | "formGroup" | "items"> {
    hint?: Child;
    errorMessage?: Child;
    items: RadioItem[];
    children?: Child;
}
interface RadioItem {
    /** Text to use within each radio item label **/
    content: JSXNode;
    /** Specific ID attribute for the radio item. If omitted, then `idPrefix` string will be applied. **/
    id?: string;
    /** Value for the radio input. **/
    value: string;
    /** Subset of options for the label used by each radio item within the radios component. **/
    label?: {
        /** Classes to add to the label tag. **/
        classes?: string;
        /** HTML attributes (for example data attributes) to add to the label tag. **/
        attributes?: Record<string, unknown>;
    };
    /** Can be used to add a hint to each radio item within the radios component. **/
    hint?: Record<string, unknown>;
    /** Divider text to separate radio items, for example the text `"or"`. **/
    divider?: string;
    /** Whether the radio should be checked when the page loads. Takes precedence over the top-level `value` option. **/
    checked?: boolean;
    /** Provide additional content to reveal when the radio is checked. **/
    conditional?: {
        /** The HTML to reveal when the radio is checked. **/
        html: string;
    };
    /** If `true`, radio will be disabled. **/
    disabled?: boolean;
    /** HTML attributes (for example data attributes) to add to the radio input tag. **/
    attributes?: Record<string, unknown>;
}
export declare function Radios({ fieldset, hint, errorMessage, ...props }: RadiosProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
