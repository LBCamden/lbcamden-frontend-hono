import { FC } from "hono/jsx";
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
    pageTitle?: string;
}
declare const _default: FC<PageLayoutProps>;
export default _default;
