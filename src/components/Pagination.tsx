import { Child } from "hono/jsx";
import { GovUKPagination, type GovUKPaginationProps } from "../upstream";
import { renderChildFragment } from "../lib/hono-jsx-utils";

export interface PaginationProps
  extends Omit<GovUKPaginationProps, "next" | "previous"> {
  next?: PaginationAnchor;
  previous?: PaginationAnchor;
}

export interface PaginationAnchor {
  /** The content of the link. Defaults to `"Previous page"`, with 'page' being visually hidden. **/
  content?: Child;

  /** The optional label that goes underneath the link, providing further context for the user about where the link goes. **/
  labelText?: string;

  /** The page's URL. **/
  href: string;

  /** The HTML attributes (for example, data attributes) you want to add to the anchor. **/
  attributes?: Record<string, unknown>;
}

export async function Pagination(props: PaginationProps) {
  return (
    <GovUKPagination
      {...props}
      next={await convertAnchor(props.next)}
      previous={await convertAnchor(props.previous)}
    />
  );
}

async function convertAnchor(anchor?: PaginationAnchor) {
  if (!anchor) return;
  const { content, ...rest } = anchor;

  return {
    ...rest,
    ...(await renderChildFragment(content)),
  };
}
