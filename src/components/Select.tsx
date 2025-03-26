import { Child } from "hono/jsx";
import GovUKSelect, {
  type GovUKSelectProps,
} from "govuk-frontend/dist/govuk/components/select/template.njk";
import { HasEmbeddedContentArray } from "../types";
import { honoTextOrHtmlToGovUK, mapAsync } from "../lib/hono-jsx-utils";

export interface SelectProps
  extends Omit<
    GovUKSelectProps,
    "items" | "hint" | "errorMessage" | "fieldset"
  > {
  hint?: Child;
  errorMessage?: Child;
  items: HasEmbeddedContentArray<GovUKSelectProps["items"]>;
}

export async function Select({ hint, errorMessage, ...props }: SelectProps) {
  const items = await mapAsync(props.items, async ({ content, ...item }) => ({
    ...item,
    ...(await honoTextOrHtmlToGovUK(content)),
  }));
  return (
    <GovUKSelect
      {...props}
      items={items}
      hint={await honoTextOrHtmlToGovUK(hint)}
      errorMessage={await honoTextOrHtmlToGovUK(errorMessage)}
    />
  );
}
