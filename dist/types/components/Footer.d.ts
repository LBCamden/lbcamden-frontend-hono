import { Child } from "hono/jsx";
import { type GovUKFooterProps } from "../upstream";
import { EmbeddedContent } from "../types";
export interface FooterProps extends Omit<GovUKFooterProps, "contentLicence" | "copyright" | "meta"> {
    /** The content licence information within the footer component. Defaults to Open Government Licence (OGL) v3 licence. **/
    contentLicence?: Child;
    /** The copyright information in the footer component, this defaults to `"© Crown copyright"`. **/
    copyright?: Child;
    /** The meta section of the footer after any navigation, before the copyright and license information. **/
    meta?: EmbeddedContent<GovUKFooterProps["meta"]>;
}
export declare function Footer({ contentLicence, copyright, meta, ...props }: FooterProps): Promise<import("hono/utils/html").HtmlEscapedString>;
