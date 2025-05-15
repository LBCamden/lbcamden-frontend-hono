import { Child } from "hono/jsx";
import {
  GovUKPhaseBanner,
  type GovUKPhaseBannerProps,
} from "../upstream/govuk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface PhaseBannerProps
  extends Omit<GovUKPhaseBannerProps, "text" | "html" | "tag"> {
  children?: Child;
  tag?: Child;
}

export async function PhaseBanner({ children, ...props }: PhaseBannerProps) {
  return (
    <GovUKPhaseBanner
      {...props}
      {...await honoTextOrHtmlToGovUK(children)}
      tag={await honoTextOrHtmlToGovUK(props.tag)}
    />
  );
}
