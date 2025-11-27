import { Child, FC, PropsWithChildren } from "hono/jsx";
import LBCamdenTemplate from "./layout";
import { renderHtml } from "../lib/hono-jsx-utils";
import { AssetPathOpts, getAssetPaths } from "../utils/asset-paths";
import { jsxRenderer } from "hono/jsx-renderer";

export interface SharedPageConfig {
  assetPath?: string;
  assetUrl?: string;
  metaDescription?: string;
  assetConf?: AssetPathOpts;
  cspNonce?: string;
  mainClasses?: string;
  bodyClasses?: string;
  htmlClasses?: string;

  headIcons?: Child;
  head?: Child;
  bodyStart?: Child;
  skipLink?: Child;
  header?: Child;
  beforeContent?: Child;
  postContent?: Child;
  afterContent?: Child;
  footer?: Child;
  bodyEnd?: Child;
}

export interface PageProps extends SharedPageConfig {
  pageTitle?: string;
  main?: Child;
  children?: Child;
}

export async function Page(baseProps: PageProps) {
  if (baseProps.assetConf) {
    const { assetPath, head } = getAssetPaths(baseProps.assetConf);
    baseProps.assetPath = assetPath;
    baseProps.head = (
      <>
        {head}
        {baseProps.head}
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

interface PageRendererConfig extends SharedPageConfig {
  titleSuffix?: string;
  mainLayout?: FC<PropsWithChildren>;
}

export function camdenPageRenderer({
  titleSuffix = "Camden Council",
  mainLayout: Layout = ({ children }) => (
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds-from-desktop">{children}</div>
    </div>
  ),
  ...conf
}: PageRendererConfig) {
  return jsxRenderer(
    ({ children, title, metaDescription }) => (
      <Page
        mainClasses="govuk-width-container"
        assetConf={{
          prodAssetPath: "",
          devAssetPath: "",
          isDev: false,
          jsMain: "lbcamden-frontend.min.js",
          styleMain: "lbcamden-frontend.min.css",
        }}
        {...conf}
        pageTitle={title ? `${title} - ${titleSuffix}` : titleSuffix}
        metaDescription={metaDescription ?? conf.metaDescription}
      >
        <Layout>{children}</Layout>
      </Page>
    ),
    {
      docType: "<!DOCTYPE html>",
    }
  );
}
