import { Child } from "hono/jsx";
import { LBCamdenHeader, type LBCamdenHeaderProps } from "../upstream";
import { renderHtml } from "../lib/hono-jsx-utils";

export interface HeaderProps
  extends Omit<
    LBCamdenHeaderProps,
    "search" | "phaseBanner" | "emergencyBanner"
  > {
  homepageUrl?: string;
  navigation?: HeaderNavItem[];
  emergencyBanner?: Child;
  search?:
    | false
    | {
        action?: string;
        name?: string;
        additionalParameters?: Record<string, string | number>;
      };
}

interface HeaderNavLink {
  href: string;
  text: string;
}

export type HeaderNavItem =
  | HeaderNavLink
  | { text: string; description?: string; subItems: HeaderNavItem[] };

export async function Header({
  navigation,
  emergencyBanner,
  search,
  ...props
}: HeaderProps) {
  const navigationProps = {
    navigation,
    search,
  };

  return (
    <LBCamdenHeader
      {...props}
      {...(navigationProps as {})}
      emergencyBanner={
        emergencyBanner ? await renderHtml(emergencyBanner) : undefined
      }
    />
  );
}
