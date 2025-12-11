import { LBCamdenFooter, type LBCamdenFooterProps } from "../upstream";

export interface FooterProps
  extends Omit<LBCamdenFooterProps, "navigationSocial"> {
  navigationSocial?: FooterSocialNavItem[];
}

export interface FooterNavItem {
  text: string;
  href: string;
  attributes?: Record<string, string>;
}

export interface FooterSocialNavItem extends FooterNavItem {
  icon: "facebook" | "youtube" | "twitter" | "linkedin" | "instagram" | string;
}

export async function Footer({ navigationSocial, ...props }: FooterProps) {
  return (
    <LBCamdenFooter
      {...props}
      navigationSocial={navigationSocial?.map(
        (x) =>
          ({
            ...x,
            attributes: {
              ...x.attributes,
              "data-icon": x.icon,
            },
          } as any)
      )}
    />
  );
}
