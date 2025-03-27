import { Child } from "hono/jsx";
import { GovUKAccordion, type GovUKAccordionProps } from "../upstream/govuk";
import { mapAsync, honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface AccordionProps extends Omit<GovUKAccordionProps, "items"> {
  items: AccordionItem[];
}

export interface AccordionItem {
  /** The heading of each accordion section. **/
  heading: Child;

  /** The summary line of each accordion section. **/
  summary?: Child;

  /** The content of each accordion section. **/
  content?: Child;

  /** Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`. **/
  expanded?: boolean;
}

export async function Accordion({ items, ...props }: AccordionProps) {
  const govukItems = await mapAsync(items, async (item) => ({
    heading: await honoTextOrHtmlToGovUK(item.heading),
    summary: await honoTextOrHtmlToGovUK(item.summary),
    content: await honoTextOrHtmlToGovUK(item.content),
    expanded: item.expanded,
  }));

  return <GovUKAccordion items={govukItems} {...props} />;
}
