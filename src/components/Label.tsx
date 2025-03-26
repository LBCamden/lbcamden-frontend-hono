import { Child } from "hono/jsx";
import GovUKLabel, {
  type GovUKLabelProps,
} from "govuk-frontend/dist/govuk/components/label/template.njk";

export interface LabelProps extends GovUKLabelProps {
  children?: Child;
}

export function Label(props: LabelProps) {
  return <GovUKLabel {...props} />;
}
