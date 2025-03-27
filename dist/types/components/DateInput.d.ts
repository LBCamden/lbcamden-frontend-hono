import { Child } from "hono/jsx";
import { type GovUKDateInputProps } from "../upstream/govuk";
export interface DateInputProps extends Omit<GovUKDateInputProps, "formGroup"> {
    children?: Child;
}
export declare function DateInput(props: DateInputProps): import("hono/jsx/jsx-dev-runtime").JSX.Element;
