import { Child, FC, PropsWithChildren } from "hono/jsx";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Header, HeaderNavItem } from "../components/Header";
import { Footer, FooterProps } from "../components";
import { Context, Env, MiddlewareHandler } from "hono";
import { html } from "hono/html";
import { GovUKSkipLink, LBCamdenFooter, LBCamdenHeader } from "../upstream";

export interface SharedPageConfig {
  assetPath?: string;
  assetUrl?: string;
  metaDescription?: string;
  assetConf?: AssetPathOpts;
  mainClasses?: string;
  bodyClasses?: string;
  htmlClasses?: string;
  cacheBreaker?: string;

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

export interface AssetPathOpts {
  jsMain: string;
  cssMain: string;
}

export interface PageProps extends SharedPageConfig {
  pageTitle?: string;
  main?: Child;
  children?: Child;
}

export async function Page(baseProps: PageProps) {
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
    metaDescription,
    htmlClasses = "",
    mainClasses = "",
    bodyClasses = "",
    cacheBreaker,
    assetPath = "/assets",
    pageTitle
  } = baseProps;

  const { script, style } = getAssetRefs(assetConf);
  const c = useRequestContext()
  console.log('Page')
  const cspNonce = c.var.secureHeadersNonce
  const nonceAttr = cspNonce ? html`nonce="${cspNonce}"` : ""

  return (
    <html lang="en" class={`govuk-template ${htmlClasses}`}>
      <head>
        <meta charset="utf-8" />
        <title>{{ pageTitle }}</title>

        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        <meta name="theme-color" content="{{ themeColor | default('#101812') }}" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        {headIcons ?? (
          <>
            <link rel="shortcut icon" sizes="16x16 32x32 48x48"
              href={`${assetPath}/images/favicons/favicon.ico`}
              type="image/x-icon" />
            <link rel="apple-touch-icon" sizes="180x180"
              href={`${assetPath}/images/favicons/apple-icon-180x180.png`} />
            <link rel="apple-touch-icon" sizes="152x152"
              href={`${assetPath}/images/favicons/apple-icon-152x152.png`} />
            <link rel="apple-touch-icon" href={`${assetPath}/images/favicons/apple-icon.png`} />
          </>
        )}

        {html`<style ${nonceAttr}>.govuk-template { background-color: #4d5051 !important; }</style>`}
        <script
          type="module"
          src={cacheBreak(script, cacheBreaker)}
          nonce={cspNonce}
        />
        <link
          rel="stylesheet"
          href={cacheBreak(style, cacheBreaker)}
          nonce={cspNonce}
        />
        {head}

        <meta property="og:image" content={`${assetPath}/images/ms-icon-310x310.png`} />
      </head>
      <body
        class={`govuk-template__body ${bodyClasses}`}
      >
        {html`<script ${nonceAttr}>document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled')</script>`}
        {html`<script ${nonceAttr}>if ('noModule' in HTMLScriptElement.prototype) document.body.classList.add("govuk-frontend-supported")</script>`}

        {bodyStart}
        {skipLink ?? (
          <GovUKSkipLink
            href="#main-content"
            text="Skip to main content"
            html="Skip to main content"
          />
        )}

        {header ?? <LBCamdenHeader />}
        {main ?? (
          <main class={`govuk-main-wrapper ${mainClasses}`} role="main">
            {beforeContent}

            <div id="main-content">
              {children}
            </div>

            {postContent}
          </main>
        )}

        {afterContent}

        {footer ?? <LBCamdenFooter />}
        {bodyEnd}
      </body>
    </html>
  );
}

export interface PageRendererConfig extends SharedPageConfig {
  titleSuffix?: string;
  mainLayout?: FC<PropsWithChildren>;
  headerItems?: HeaderNavItem[];
  footerItems?: Partial<FooterProps>;
  cookiesUrl?: string;
  accessibilityStatementUrl?: string;
}

export function camdenPageRenderer<E extends Env>(
  confSrc: PageRendererConfig | ((context: Context<E>) => PageRendererConfig),
) {
  return jsxRenderer(
    ({ children, title, metaDescription }) => {
      const c = useRequestContext()
      console.log('jsx')

      const {
        titleSuffix = "Camden Council",
        mainLayout: Layout = ({ children }) => (
          <main class="govuk-main-wrapper" role="main">
            {conf.beforeContent}

            <div class={conf.mainClasses} id="main-content">
              {children}
            </div>

            {conf.afterContent}
          </main>
        ),
        headerItems = defaultHeaderItems,
        footerItems,
        footer,
        ...conf
      } = typeof confSrc === "function" ? confSrc(c) : confSrc;

      return (
        <Page
          mainClasses="govuk-width-container"
          assetConf={{
            jsMain: "lbcamden-frontend.min.js",
            cssMain: "lbcamden-frontend.min.css",
          }}
          {...conf}
          pageTitle={title ? `${title} - ${titleSuffix}` : titleSuffix}
          metaDescription={metaDescription ?? conf.metaDescription}
          footer={
            footer ?? (
              <Footer {...defaultFooterNavItems(conf)} {...footerItems} />
            )
          }
          header={
            conf.header ?? (
              <Header
                navigation={headerItems}
                homepageUrl="https://www.camden.gov.uk"
                search={{
                  action: "https://www.camden.gov.uk/search",
                  name: "q",
                }}
              />
            )
          }
          main={<Layout>{children}</Layout>}
        />
      );
    },
    {
      docType: "<!DOCTYPE html>",
    },
  ) as MiddlewareHandler<E>;
}

const defaultFooterNavItems = ({
  cookiesUrl,
  accessibilityStatementUrl,
}: PageRendererConfig): Partial<FooterProps> => ({
  navigation: [
    {
      href: "https://www.camden.gov.uk/contact-camden",
      text: "Contact Camden",
    },
    {
      href: "https://find.camden.gov.uk/",
      text: "Find your nearest",
    },
    {
      href: "https://contact.camden.gov.uk/login",
      text: "Resident account",
    },
    {
      href: "https://www.camden.gov.uk/jobs-camden-council",
      text: "Jobs at Camden Council",
    },
    {
      href: "https://www.camden.gov.uk/decision-making-in-camden",
      text: "Decision making in Camden",
    },
    {
      href: "https://www.camden.gov.uk/using-our-website",
      text: "Accessibility options",
    },
    {
      href: "https://www.camden.gov.uk/translation",
      text: "Translation",
    },
  ],
  navigationUtility: [
    {
      href: "https://www.camden.gov.uk/freedom-information-request",
      text: "Freedom of Information (FOI) requests",
    },
    {
      href: "https://www.camden.gov.uk/data-protection-privacy-and-cookies",
      text: "Data protection and privacy",
    },
    {
      href:
        accessibilityStatementUrl ??
        "https://www.camden.gov.uk/accessibility-statement",
      text: "Accessibility statement",
    },
    {
      href: cookiesUrl ?? "https://www.camden.gov.uk/cookies",
      text: "Cookies",
    },
  ],
  navigationSecondary: [
    {
      href: "https://www.camden.gov.uk/have-your-say",
      text: "Have your say",
      attributes: {
        "data-highlighted": true,
      },
    },
    {
      href: "https://public.govdelivery.com/accounts/UKLBC/subscriber/new?topic_id=UKLBC_559",
      text: "Subscribe to our newsletters",
      attributes: {
        "data-highlighted": true,
      },
    },
    {
      href: "https://www.camden.gov.uk/report-a-problem-with-our-website",
      text: "Report a problem with our website",
      attributes: {
        "data-highlighted": true,
      },
    },
  ],
  navigationSocial: [
    {
      href: "https://www.facebook.com/LBCamden/",
      text: "Facebook",
      icon: "facebook",
    },
    {
      href: "https://www.youtube.com/@CamdenCouncil",
      text: "Youtube",
      icon: "youtube",
    },
    {
      href: "https://twitter.com/CamdenCouncil",
      text: "Twitter",
      icon: "twitter",
    },
    {
      href: "https://www.linkedin.com/company/london-borough-of-camden",
      text: "LinkedIn",
      icon: "linkedin",
    },
    {
      href: "https://www.instagram.com/wemakecamden/",
      text: "Instagram",
      icon: "instagram",
    },
  ],
});

const defaultHeaderItems: HeaderNavItem[] = [
  {
    text: "Services",
    subItems: [
      {
        href: "https://www.camden.gov.uk/benefits-support",
        text: "Benefits and financial support",
      },
      {
        href: "https://www.camden.gov.uk/births-deaths-marriages-citizenship",
        text: "Births, deaths, marriages and citizenship",
      },
      {
        href: "https://www.camden.gov.uk/business",
        text: "Business",
      },
      {
        href: "https://www.camden.gov.uk/children-families-young-people",
        text: "Children, families and young people",
      },
      {
        href: "https://www.camden.gov.uk/crime-safety",
        text: "Community safety",
      },
      {
        href: "https://www.camden.gov.uk/council-tax",
        text: "Council tax",
      },
      {
        href: "https://www.camden.gov.uk/education",
        text: "Education",
      },
      {
        href: "https://www.camden.gov.uk/environmental-issues",
        text: "Environmental issues",
      },
      {
        href: "https://www.camden.gov.uk/housing",
        text: "Housing",
      },
      {
        href: "https://www.camden.gov.uk/jobs-skills",
        text: "Jobs and skills",
      },
      {
        href: "https://www.camden.gov.uk/libraries-local-studies",
        text: "Libraries, local studies and archives",
      },
      {
        href: "https://www.camden.gov.uk/parking",
        text: "Parking",
      },
      {
        href: "https://www3.camden.gov.uk/pay/",
        text: "Pay",
      },
      {
        href: "https://www.camden.gov.uk/planning-building-development",
        text: "Planning and building development",
      },
      {
        href: "https://www.camden.gov.uk/recycling-and-rubbish",
        text: "Recycling and rubbish",
      },
      {
        href: "https://www.camden.gov.uk/roads-and-travel",
        text: "Roads and travel",
      },
      {
        href: "https://www.camden.gov.uk/social-care-health",
        text: "Social care and health",
      },
      {
        href: "https://www.camden.gov.uk/sports-leisure",
        text: "Sport, parks, arts and events",
      },
      {
        href: "https://www.camden.gov.uk/your-council",
        text: "Your council",
      },
    ],
  },
  {
    text: "News",
    href: "https://news.camden.gov.uk/",
  },
  {
    text: "Camden Account",
    subItems: [
      {
        href: "https://contact.camden.gov.uk/en-GB/",
        text: "Resident account",
      },
      {
        href: "https://business.camden.gov.uk/",
        text: "Business account",
      },
    ],
  },
];

function getAssetRefs(opts?: AssetPathOpts) {
  if (opts) {
    return {
      script: opts.jsMain,
      style: opts.cssMain,
    };
  } else {
    return {
      script: "/lbcamden-frontend.min.js",
      style: "/lbcamden-frontend.min.css",
    };
  }
}

function cacheBreak(url: string, breaker?: string) {
  if (!breaker) return url;
  return `${url}?v=${breaker}`;
}