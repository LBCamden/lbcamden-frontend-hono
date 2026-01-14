import { Child } from "hono/jsx";
import {
  GovUKCookieBanner,
  type GovUKCookieBannerProps,
} from "../upstream/govuk";
import { renderChildFragment, mapAsync } from "../lib/hono-jsx-utils";

export interface CookieBannerProps
  extends Omit<GovUKCookieBannerProps, "messages"> {
  messages: CookieBannerMessage[];
}

interface CookieBannerMessage {
  /** The heading text that displays in the message. **/
  heading?: Child;

  /** The text for the main content within the message. **/
  content: Child;

  /** The buttons and links that you want to display in the message. `actions` defaults to `"button"` unless you set `href`, which renders the action as a link. **/
  actions?: Array<CookieBannerAction>;

  role?: string;
}

interface CookieBannerAction {
  /** The button or link text. **/
  content: Child;

  /** The type of button – `"button"` or `"submit"`. If `href` is provided, set `type` to `"button"` render a link styled as a button. **/
  type?: string;

  /** The `href` for a link. Set `type` to `"button"` and set `href` to render a link styled as a button. **/
  href?: string;

  /** The name attribute for the button. Does not apply if you set `href`, which makes a link. **/
  name?: string;

  /** The value attribute for the button. Does not apply if you set `href`, which makes a link. **/
  value?: string;

  /** The additional classes that you want to add to the button or link. **/
  classes?: string;

  /** The additional attributes that you want to add to the button or link. For example, data attributes. **/
  attributes?: Record<string, unknown>;
}

export async function CookieBanner(props: CookieBannerProps) {
  return (
    <GovUKCookieBanner
      {...props}
      messages={await mapAsync(
        props.messages,
        async ({ heading, content, actions = [], ...messages }) => ({
          ...messages,
          ...(await renderChildFragment(heading, {
            html: "headingHtml",
            text: "headingText",
          })),
          ...(await renderChildFragment(content)),
          actions: await mapAsync(actions, async ({ content, ...action }) => ({
            ...action,
            ...(await renderChildFragment(content)),
          })),
        })
      )}
    />
  );
}
