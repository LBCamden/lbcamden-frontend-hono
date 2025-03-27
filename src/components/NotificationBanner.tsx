import { Child } from "hono/jsx";
import {
  GovUKNotificationBanner,
  type GovUKNotificationBannerProps,
} from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface NotificationBannerProps
  extends Omit<
    GovUKNotificationBannerProps,
    "text" | "html" | "titleText" | "titleHtml"
  > {
  title: Child;
  children?: Child;
}

export async function NotificationBanner({
  title,
  children,
  ...props
}: NotificationBannerProps) {
  return (
    <GovUKNotificationBanner
      {...props}
      {...await honoTextOrHtmlToGovUK(children)}
      {...await honoTextOrHtmlToGovUK(title, {
        text: "titleText",
        html: "titleHtml",
      })}
    />
  );
}
