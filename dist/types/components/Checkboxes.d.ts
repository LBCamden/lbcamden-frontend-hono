import { Child } from "hono/jsx";
import { type GovUKCheckboxesProps } from "../upstream/govuk";
export interface CheckboxesProps extends GovUKCheckboxesProps {
    children?: Child;
}
export declare function Checkboxes(props: CheckboxesProps): import("hono/jsx/jsx-dev-runtime").JSX.Element;
