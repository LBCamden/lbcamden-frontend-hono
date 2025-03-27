import { Child } from "hono/jsx";
import { GovUKBackLink, type GovUKBackLinkProps } from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface BackLinkProps
  extends Omit<GovUKBackLinkProps, "text" | "html"> {
  children?: Child;
}

export function BackLink({ children, ...props }: BackLinkProps) {
  return <GovUKBackLink {...honoTextOrHtmlToGovUK(children)} {...props} />;
}
