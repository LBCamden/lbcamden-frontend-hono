import { Child } from "hono/jsx";
import {
  GovUKBreadcrumbs,
  type GovUKBreadcrumbsProps,
} from "../upstream/govuk";
import { mapAsync, honoTextOrHtmlToGovUK } from "../lib/hono-jsx-utils";

export interface BreadcrumbsProps extends Omit<GovUKBreadcrumbsProps, "items"> {
  items: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  content: Child;

  /** HTML attributes (for example data attributes) to add to the individual crumb. **/
  attributes?: Record<string, unknown>;

  /** Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item. **/
  href?: string;
}

export async function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
  const govukItems = await mapAsync(items, async ({ content, ...rest }) => ({
    ...(await honoTextOrHtmlToGovUK(content)),
    ...rest,
  }));

  return <GovUKBreadcrumbs items={govukItems} {...props} />;
}
