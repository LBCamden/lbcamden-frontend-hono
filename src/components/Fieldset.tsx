import { Child, isValidElement } from "hono/jsx";
import { GovUKFieldset, type GovUKFieldsetProps } from "../upstream/govuk";
import {
  renderChildFragment,
  isJsxChild,
  renderHtml,
} from "../lib/hono-jsx-utils";

export interface FieldsetOptions
  extends Omit<GovUKFieldsetProps, "html" | "legend"> {
  legend?: FieldsetLegend | Child;
}

export interface FieldsetProps extends FieldsetOptions {
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

export async function Fieldset({ children, ...props }: FieldsetProps) {
  return (
    <GovUKFieldset
      {...await renderChildFragment(children)}
      {...await fieldsetOptions(props)}
    />
  );
}

export async function fieldsetOptions(props: FieldsetOptions | undefined) {
  if (!props) return;
  let { legend, ...rest } = props;

  if (isJsxChild(legend)) {
    legend = { content: legend };
  }

  return {
    ...rest,
    legend: legend && {
      ...(legend as any),
      ...(await renderChildFragment(legend.content)),
    },
  };
}
