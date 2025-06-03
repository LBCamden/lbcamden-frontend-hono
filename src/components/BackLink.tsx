import { Child } from "hono/jsx";
import { GovUKBackLink, type GovUKBackLinkProps } from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface BackLinkProps
  extends Omit<GovUKBackLinkProps, "text" | "html"> {
  children?: Child;
}

export async function BackLink({ children, ...props }: BackLinkProps) {
  return <GovUKBackLink {...await renderChildFragment(children)} {...props} />;
}
