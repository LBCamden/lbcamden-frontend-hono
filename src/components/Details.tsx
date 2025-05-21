import { Child } from "hono/jsx";
import { GovUKDetails, type GovUKDetailsProps } from "../upstream";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface DetailsProps
  extends Omit<
    GovUKDetailsProps,
    "text" | "html" | "summaryText" | "summaryHtml"
  > {
  summary?: Child;
  children?: Child;
}

export async function Details({ children, summary, ...props }: DetailsProps) {
  return (
    <GovUKDetails
      {...props}
      {...await renderChildFragment(children)}
      {...await renderChildFragment(summary, {
        text: "summaryText",
        html: "summaryHtml",
      })}
    />
  );
}
