import { Child } from "hono/jsx";
import { GovUKDetails, type GovUKDetailsProps } from "../upstream";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

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
      {...await honoTextOrHtmlToGovUK(children)}
      {...await honoTextOrHtmlToGovUK(summary, {
        text: "summaryText",
        html: "summaryHtml",
      })}
    />
  );
}
