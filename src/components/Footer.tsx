import { Child } from "hono/jsx";
import { LBCamdenFooter, type LBCamdenFooterProps } from "../upstream";
import { EmbeddedContent } from "../types";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface FooterProps extends LBCamdenFooterProps {}

export async function Footer({ ...props }: FooterProps) {
  return <LBCamdenFooter {...props} />;
}
