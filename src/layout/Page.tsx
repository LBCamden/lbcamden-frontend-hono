import { Child } from "hono/jsx";
import LBCamdenTemplate from "./layout";
import { renderHtml } from "../lib/hono-jsx-utils";
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
      headIcons={await renderHtml(headIcons)}
      head={await renderHtml(head)}
      bodyStart={await renderHtml(bodyStart)}
      skipLink={await renderHtml(skipLink)}
      header={await renderHtml(header)}
      main={await renderHtml(main)}
      beforeContent={await renderHtml(beforeContent)}
      content={await renderHtml(children)}
      postContent={await renderHtml(postContent)}
      afterContent={await renderHtml(afterContent)}
      footer={await renderHtml(footer)}
      bodyEnd={await renderHtml(bodyEnd)}
    />
  );
}
