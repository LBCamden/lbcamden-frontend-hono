import { Child, isValidElement } from "hono/jsx";
import { GovUKFieldset, type GovUKFieldsetProps } from "../upstream/govuk";
import {
  renderChildFragment,
  isJsxChild,
  renderHtml,
} from "../lib/hono-jsx-utils";

export interface FieldsetProps
  extends Omit<GovUKFieldsetProps, "html" | "legend"> {
  legend?: FieldsetLegend | Child;
  children?: Child;
}

interface FieldsetLegend {
  /** Content to use within the legend. **/
  content: Child;

  /** Classes to add to the legend. **/
  classes?: string;

  /** Whether the legend also acts as the heading for the page. **/
  isPageHeading?: boolean;
}

export async function Fieldset({ legend, children, ...props }: FieldsetProps) {
  if (isJsxChild(legend)) {
    legend = { content: legend };
  }

  return (
    <GovUKFieldset
      {...props}
      {...await renderChildFragment(children)}
      legend={
        legend && {
          ...(legend as any),
          ...(await renderChildFragment(legend.content)),
        }
      }
    />
  );
}
