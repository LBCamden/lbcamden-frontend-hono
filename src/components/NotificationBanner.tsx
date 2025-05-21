import { Child } from "hono/jsx";
import {
  GovUKNotificationBanner,
  type GovUKNotificationBannerProps,
} from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

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
      {...await renderChildFragment(children)}
      {...await renderChildFragment(title, {
        text: "titleText",
        html: "titleHtml",
      })}
    />
  );
}
