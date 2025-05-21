import { Child } from "hono/jsx";
import { type GovUKExitThisPageProps } from "../upstream";
export interface ExitThisPageProps extends Omit<GovUKExitThisPageProps, "text" | "html"> {
    children?: Child;
}
export declare function ExitThisPage({ children, ...props }: ExitThisPageProps): Promise<import("hono/utils/html").HtmlEscapedString>;
