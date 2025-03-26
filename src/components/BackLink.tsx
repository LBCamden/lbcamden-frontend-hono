import { Child } from "hono/jsx";
import GovUKBackLink, {
  type GovUKBackLinkProps,
} from "govuk-frontend/dist/govuk/components/back-link/template.njk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface BackLinkProps
  extends Omit<GovUKBackLinkProps, "text" | "html"> {
  children?: Child;
}

export default function BackLink({ children, ...props }: BackLinkProps) {
  return <GovUKBackLink {...honoTextOrHtmlToGovUK(children)} {...props} />;
}
