import { Child } from "hono/jsx";
import { GovUKExitThisPage, type GovUKExitThisPageProps } from "../upstream";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface ExitThisPageProps
  extends Omit<GovUKExitThisPageProps, "text" | "html"> {
  children?: Child;
}

export async function ExitThisPage({ children, ...props }: ExitThisPageProps) {
  return (
    <GovUKExitThisPage {...props} {...await honoTextOrHtmlToGovUK(children)} />
  );
}
