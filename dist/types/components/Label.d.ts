import { Child } from "hono/jsx";
import { type GovUKLabelProps } from "../upstream/govuk";
export interface LabelProps extends GovUKLabelProps {
    children?: Child;
}
export declare function Label(props: LabelProps): import("hono/jsx/jsx-dev-runtime").JSX.Element;
