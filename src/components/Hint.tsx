import { Child } from "hono/jsx";
import { GovUKHint, type GovUKHintProps } from "../upstream/govuk";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface HintProps extends Omit<GovUKHintProps, "text" | "html"> {
  children?: Child;
}

export async function Hint({ children, ...props }: HintProps) {
  return <GovUKHint {...props} {...await renderChildFragment(children)} />;
}
