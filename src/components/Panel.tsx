import { Child } from "hono/jsx";
import { GovUKPanel, type GovUKPanelProps } from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface PanelProps
  extends Omit<GovUKPanelProps, "text" | "html" | "titleText" | "titleHtml"> {
  title: Child;
  children?: Child;
}

export async function Panel({ title, children, ...props }: PanelProps) {
  return (
    <GovUKPanel
      {...props}
      {...await renderChildFragment(children)}
      {...await renderChildFragment(title, {
        text: "titleText",
        html: "titleHtml",
      })}
    />
  );
}
