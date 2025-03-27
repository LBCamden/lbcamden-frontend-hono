import { Child } from "hono/jsx";
import { GovUKFieldset, type GovUKFieldsetProps } from "../upstream/govuk";
import { honoTextOrHtmlToGovUK, renderTextOrHtml } from "../lib/hono-jsx-utils";

export interface FieldsetProps
  extends Omit<GovUKFieldsetProps, "html" | "legend"> {
  legend?: FieldsetLegend;
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
  return (
    <GovUKFieldset
      {...props}
      html={await renderTextOrHtml(children)}
      legend={
        legend && {
          ...legend,
          ...(await honoTextOrHtmlToGovUK(legend.content)),
        }
      }
    />
  );
}
