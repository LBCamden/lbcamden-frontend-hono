import { Child } from "hono/jsx";
import { type GovUKCharacterCountProps } from "../upstream";
export interface CharacterCountProps extends Omit<GovUKCharacterCountProps, "label" | "hint" | "formGroup" | "textareaDescriptionText" | "textareaDescriptionHtml" | "errorMessage"> {
    label?: Child;
    hint?: Child;
    formGroup?: CharacterCountFormGroup;
    textareaDescription?: Child;
    /** Can be used to add an error message to the character count component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
    errorMessage?: Child;
}
export interface CharacterCountFormGroup {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string;
    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>;
    /** Content to add before the textarea used by the character count component. **/
    beforeInput?: Child;
    /** Content to add after the textarea used by the character count component. **/
    afterInput?: Child;
}
export declare function CharacterCount(props: CharacterCountProps): Promise<import("hono/utils/html").HtmlEscapedString>;
