import { Child } from "hono/jsx";
import GovUKHint, {
  type GovUKHintProps,
} from "govuk-frontend/dist/govuk/components/hint/template.njk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface HintProps extends Omit<GovUKHintProps, "text" | "html"> {
  children?: Child;
}

export async function Hint({ children, ...props }: HintProps) {
  return <GovUKHint {...props} {...await honoTextOrHtmlToGovUK(children)} />;
}
