import { Child } from "hono/jsx";
import GovUKPhaseBanner, {
  type GovUKPhaseBannerProps,
} from "govuk-frontend/dist/govuk/components/phase-banner/template.njk";
import { honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface PhaseBannerProps
  extends Omit<GovUKPhaseBannerProps, "text" | "html"> {
  children?: Child;
}

export async function PhaseBanner({ children, ...props }: PhaseBannerProps) {
  return (
    <GovUKPhaseBanner {...props} {...await honoTextOrHtmlToGovUK(children)} />
  );
}
