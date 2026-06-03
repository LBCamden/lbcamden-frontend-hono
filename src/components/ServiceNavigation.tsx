import { Child } from "hono/jsx";
import { GovUKServiceNavigationProps, GovUKServiceNavigation } from "../upstream";
import { ValueOf } from "../utils/types";
import { renderChildFragment, renderHtml } from "../lib/hono-jsx-utils";

export interface ServiceNavigationProps extends Omit<GovUKServiceNavigationProps, "slots" | "navigation"> {
  navigation?: ServiceNavigationItem[]
  slots?: {
    start: Child,
    end?: Child,
    navigationStart?: Child,
    navigationEnd?: Child
  }
}

export interface ServiceNavigationItem extends Omit<ValueOf<GovUKServiceNavigationProps['navigation']>, "html" | "text"> {
  content?: Child
}

export async function ServiceNavigation({ navigation = [], slots, ...props }: ServiceNavigationProps) {
  return (
    <GovUKServiceNavigation
      navigation={await Promise.all(navigation.map(async ({ content, ...item }) => ({
        ...item,
        ...await renderChildFragment(content)
      })))}
      slots={slots && {
        start: await renderHtml(slots.start),
        end: await renderHtml(slots.end),
        navigationStart: await renderHtml(slots.navigationStart),
        navigationEnd: await renderHtml(slots.navigationEnd),
      }}
      {...props}
    />
  );
}
