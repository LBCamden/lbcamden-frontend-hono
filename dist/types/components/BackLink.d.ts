import { Child } from "hono/jsx";
import { type GovUKBackLinkProps } from "../upstream/govuk";
export interface BackLinkProps extends Omit<GovUKBackLinkProps, "text" | "html"> {
    children?: Child;
}
export declare function BackLink({ children, ...props }: BackLinkProps): import("hono/jsx/jsx-dev-runtime").JSX.Element;
