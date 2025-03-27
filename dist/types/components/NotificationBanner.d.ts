import { Child } from "hono/jsx";
import { type GovUKNotificationBannerProps } from "../upstream/govuk";
export interface NotificationBannerProps extends Omit<GovUKNotificationBannerProps, "text" | "html" | "titleText" | "titleHtml"> {
    title: Child;
    children?: Child;
}
export declare function NotificationBanner({ title, children, ...props }: NotificationBannerProps): Promise<import("hono/utils/html").HtmlEscapedString>;
