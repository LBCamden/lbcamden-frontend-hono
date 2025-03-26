import { Child } from "hono/jsx";
import GovUKCheckboxes, {
  type GovUKCheckboxesProps,
} from "govuk-frontend/dist/govuk/components/checkboxes/template.njk";

export interface CheckboxesProps extends GovUKCheckboxesProps {
  children?: Child;
}

export function Checkboxes(props: CheckboxesProps) {
  return <GovUKCheckboxes {...props} />;
}
