import { Child } from "hono/jsx";
import LBCamdenTemplate from "./layout";
import { renderTextOrHtml } from "../lib/hono-jsx-utils";
import { AssetPathOpts, getAssetPaths } from "../utils/asset-paths";

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

  children?: Child;
}

export async function Page(baseProps: PageProps) {
  if (baseProps.assetConf) {
    const { assetPath, head, bodyEnd } = getAssetPaths(baseProps.assetConf);
    baseProps.assetPath = assetPath;
    baseProps.head = (
      <>
        {head}
        {baseProps.head}
      </>
    );
    baseProps.bodyEnd = (
      <>
        {bodyEnd}
        {baseProps.bodyEnd}
      </>
    );
  }

  const {
    assetConf,
    headIcons,
    head,
    bodyStart,
    skipLink,
    header,
    main,
    beforeContent,
    postContent,
    afterContent,
    footer,
    bodyEnd,
    children,
    ...props
  } = baseProps;

  return (
    <LBCamdenTemplate
      {...props}
      headIcons={await renderTextOrHtml(headIcons)}
      head={await renderTextOrHtml(head)}
      bodyStart={await renderTextOrHtml(bodyStart)}
      skipLink={await renderTextOrHtml(skipLink)}
      header={await renderTextOrHtml(header)}
      main={await renderTextOrHtml(main)}
      beforeContent={await renderTextOrHtml(beforeContent)}
      content={await renderTextOrHtml(children)}
      postContent={await renderTextOrHtml(postContent)}
      afterContent={await renderTextOrHtml(afterContent)}
      footer={await renderTextOrHtml(footer)}
      bodyEnd={await renderTextOrHtml(bodyEnd)}
    />
  );
}
