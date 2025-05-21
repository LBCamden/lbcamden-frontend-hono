import { Child } from "hono/jsx";
import { GovUKAccordion, type GovUKAccordionProps } from "../upstream/govuk";
import { mapAsync, renderChildFragment } from "../lib/hono-jsx-utils";
import { compact } from "lodash-es";

export interface AccordionProps extends Omit<GovUKAccordionProps, "items"> {
  items: (AccordionItem | false | "" | null)[];
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
  const govukItems = await mapAsync(
    items,
    async (item) =>
      item && {
        heading: await renderChildFragment(item.heading),
        summary: await renderChildFragment(item.summary),
        content: await renderChildFragment(item.content),
        expanded: item.expanded,
      }
  );

  return <GovUKAccordion items={compact(govukItems)} {...props} />;
}
