import { Child } from "hono/jsx";
import { GovUKLabel, type GovUKLabelProps } from "../upstream/govuk";

export interface LabelProps extends GovUKLabelProps {
  children?: Child;
}

export function Label(props: LabelProps) {
  return <GovUKLabel {...props} />;
}
