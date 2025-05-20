import { Child } from "hono/jsx";
import { GovUKInsetText, type GovUKInsetTextProps } from "../upstream";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface InsetTextProps
  extends Omit<GovUKInsetTextProps, "text" | "html"> {
  children?: Child;
}

export async function InsetText({ children, ...props }: InsetTextProps) {
  return (
    <GovUKInsetText {...props} {...await honoTextOrHtmlToGovUK(children)} />
  );
}
