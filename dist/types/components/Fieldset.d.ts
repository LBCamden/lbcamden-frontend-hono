import { Child } from "hono/jsx";
import { type GovUKFieldsetProps } from "../upstream/govuk";
export interface FieldsetProps extends Omit<GovUKFieldsetProps, "html" | "legend"> {
    legend?: FieldsetLegend | Child;
    children?: Child;
}
interface FieldsetLegend {
    /** Content to use within the legend. **/
    content: Child;
    /** Classes to add to the legend. **/
    classes?: string;
    /** Whether the legend also acts as the heading for the page. **/
    isPageHeading?: boolean;
}
export declare function Fieldset({ legend, children, ...props }: FieldsetProps): Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
