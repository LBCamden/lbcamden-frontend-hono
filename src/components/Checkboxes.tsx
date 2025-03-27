import { Child } from "hono/jsx";
import { GovUKCheckboxes, type GovUKCheckboxesProps } from "../upstream/govuk";

export interface CheckboxesProps extends GovUKCheckboxesProps {
  children?: Child;
}

export function Checkboxes(props: CheckboxesProps) {
  return <GovUKCheckboxes {...props} />;
}
