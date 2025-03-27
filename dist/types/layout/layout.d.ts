import { HtmlEscapedString } from "hono/utils/html";
export interface PageLayoutProps {
    assetPath?: string;
    assetUrl?: string;
    headIcons?: string;
    head?: string;
    bodyStart?: string;
    skipLink?: string;
    header?: string;
    main?: string;
    beforeContent?: string;
    content?: string;
    postContent?: string;
    afterContent?: string;
    footer?: string;
    bodyEnd?: string;
}
declare const _default: (props: PageLayoutProps) => HtmlEscapedString;
export default _default;
