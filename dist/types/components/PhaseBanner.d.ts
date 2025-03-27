import { Child } from "hono/jsx";
import { type GovUKPhaseBannerProps } from "../upstream/govuk";
export interface PhaseBannerProps extends Omit<GovUKPhaseBannerProps, "text" | "html"> {
    children?: Child;
}
export declare function PhaseBanner({ children, ...props }: PhaseBannerProps): Promise<import("hono/utils/html").HtmlEscapedString>;
