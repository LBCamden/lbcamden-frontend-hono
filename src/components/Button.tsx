import { Child } from "hono/jsx";
import { LBCamdenButton, type LBCamdenButtonProps } from "../upstream/lbcamden";

import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface ButtonProps
  extends Omit<LBCamdenButtonProps, "text" | "html"> {
  children?: Child;
}

export const Button = async ({ children, ...props }: ButtonProps) => (
  <LBCamdenButton {...await honoTextOrHtmlToGovUK(children)} {...props} />
);
