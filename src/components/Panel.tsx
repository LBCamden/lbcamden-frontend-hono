import { Child } from "hono/jsx";
import { GovUKPanel, type GovUKPanelProps } from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface PanelProps
  extends Omit<GovUKPanelProps, "text" | "html" | "titleText" | "titleHtml"> {
  title: Child;
  children?: Child;
}

export async function Panel({ title, children, ...props }: PanelProps) {
  return (
    <GovUKPanel
      {...props}
      {...await honoTextOrHtmlToGovUK(children)}
      {...await honoTextOrHtmlToGovUK(title, {
        text: "titleText",
        html: "titleHtml",
      })}
    />
  );
}
