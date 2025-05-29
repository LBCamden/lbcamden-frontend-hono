import { Child } from "hono/jsx";
import { AssetPathOpts } from "../utils/asset-paths";
export interface PageProps {
    assetPath?: string;
    assetUrl?: string;
    assetConf?: AssetPathOpts;
    headIcons?: Child;
    head?: Child;
    bodyStart?: Child;
    skipLink?: Child;
    header?: Child;
    main?: Child;
    beforeContent?: Child;
    postContent?: Child;
    afterContent?: Child;
    footer?: Child;
    bodyEnd?: Child;
    pageTitle?: string;
    children?: Child;
}
export declare function Page(baseProps: PageProps): Promise<import("hono/utils/html").HtmlEscapedString>;
