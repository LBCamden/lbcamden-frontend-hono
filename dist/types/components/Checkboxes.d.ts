import { Child } from "hono/jsx";
import { type GovUKCheckboxesProps } from "../upstream/govuk";
export interface CheckboxesProps extends Omit<GovUKCheckboxesProps, "formGroup" | "items" | "hint" | "errorMessage"> {
    formGroup?: CheckboxesFormGroup;
    items: (CheckboxesItem | false | null | "")[];
    hint?: string;
    errorMessage?: Child;
}
export interface CheckboxesFormGroup {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;
    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;
    /** Content to add before all checkbox items within the checkboxes component. **/
    beforeInputs?: Child;
    /** Content to add after all checkbox items within the checkboxes component. **/
    afterInputs?: Child;
}
export type CheckboxesItem = {
    divider: string;
} | CheckboxesContentItem;
export interface CheckboxesContentItem {
    /** Content to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. **/
    content: Child;
    /** Specific ID attribute for the checkbox item. If omitted, then component global `idPrefix` option will be applied. **/
    id?: string;
    /** Specific name for the checkbox item. If omitted, then component global `name` string will be applied. **/
    name?: string;
    /** Value for the checkbox input. **/
    value: string | number;
    /** Subset of options for the label used by each checkbox item within the checkboxes component. **/
    label?: {
        /** Classes to add to the label tag. **/
        classes?: string;
        /** HTML attributes (for example data attributes) to add to the label tag. **/
        attributes?: Record<string, unknown>;
    };
    /** Can be used to add a hint to each checkbox item within the checkboxes component. **/
    hint?: string;
    /** Divider text to separate checkbox items, for example the text `"or"`. **/
    divider?: string;
    /** Whether the checkbox should be checked when the page loads. Takes precedence over the top-level `values` option. **/
    checked?: boolean;
    /** Provide additional content to reveal when the checkbox is checked. **/
    conditional?: Child;
    /** If set to `"exclusive"`, implements a 'None of these' type behaviour via JavaScript when checkboxes are clicked. **/
    behaviour?: "exclusive";
    /** If `true`, checkbox will be disabled. **/
    disabled?: boolean;
    /** HTML attributes (for example data attributes) to add to the checkbox input tag. **/
    attributes?: Record<string, unknown>;
}
export declare function Checkboxes(props: CheckboxesProps): Promise<import("hono/utils/html").HtmlEscapedString>;
