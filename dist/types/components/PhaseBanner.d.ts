import { Child } from "hono/jsx";
import { type GovUKPhaseBannerProps } from "../upstream/govuk";
export interface PhaseBannerProps extends Omit<GovUKPhaseBannerProps, "text" | "html" | "tag"> {
    children?: Child;
    tag?: Child;
}
export declare function PhaseBanner({ children, ...props }: PhaseBannerProps): Promise<import("hono/utils/html").HtmlEscapedString>;
