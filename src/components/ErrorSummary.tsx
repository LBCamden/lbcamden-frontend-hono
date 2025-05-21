import { Child } from "hono/jsx";
import {
  GovUKErrorSummary,
  type GovUKErrorSummaryProps,
} from "../upstream/govuk";
import { renderChildFragment, mapAsync } from "../lib/hono-jsx-utils";

export interface ErrorSummaryProps
  extends Omit<
    GovUKErrorSummaryProps,
    | "errorList"
    | "titleText"
    | "titleHtml"
    | "descriptionText"
    | "descriptionHtml"
  > {
  title: Child;
  description?: Child;
  errorList?: ErrorSummaryItem[];
}

interface ErrorSummaryItem {
  /** Text for the error link item. */
  content: Child;

  /** Href link for the error item. */
  href?: string;

  /** HTML attributes (for example data attributes) to add to the error link anchor. */
  attributes?: Record<string, unknown>;
}

export async function ErrorSummary({
  title,
  description,
  ...props
}: ErrorSummaryProps) {
  const errorList = await mapAsync(
    props.errorList ?? [],
    async ({ content, ...props }) => ({
      ...props,
      ...(await renderChildFragment(content)),
    })
  );

  return (
    <GovUKErrorSummary
      {...props}
      errorList={errorList}
      {...await renderChildFragment(title, {
        text: "titleText",
        html: "titleHtml",
      })}
      {...await renderChildFragment(description, {
        text: "descriptionText",
        html: "descriptionHtml",
      })}
    />
  );
}
