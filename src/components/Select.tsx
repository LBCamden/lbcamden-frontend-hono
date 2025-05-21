import { Child } from "hono/jsx";
import { GovUKSelect, type GovUKSelectProps } from "../upstream/govuk";
import { HasEmbeddedContentArray } from "../types";
import { renderChildFragment, mapAsync } from "../lib/hono-jsx-utils";

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
    ...(await renderChildFragment(content)),
  }));
  return (
    <GovUKSelect
      {...props}
      items={items}
      hint={await renderChildFragment(hint)}
      errorMessage={await renderChildFragment(errorMessage)}
    />
  );
}
