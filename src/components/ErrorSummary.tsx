import { Child } from "hono/jsx";
import {
  GovUKErrorSummary,
  type GovUKErrorSummaryProps,
} from "../upstream/govuk";
import { honoTextOrHtmlToGovUK, mapAsync } from "../lib/hono-jsx-utils";

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
      ...(await honoTextOrHtmlToGovUK(content)),
    })
  );

  return (
    <GovUKErrorSummary
      {...props}
      errorList={errorList}
      {...await honoTextOrHtmlToGovUK(title, {
        text: "titleText",
        html: "titleHtml",
      })}
      {...await honoTextOrHtmlToGovUK(description, {
        text: "descriptionText",
        html: "descriptionHtml",
      })}
    />
  );
}
