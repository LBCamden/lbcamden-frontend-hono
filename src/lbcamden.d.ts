declare module "lbcamden-frontend/lbcamden/components/button/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenButtonProps {
    /** Whether to use an `input`, `button` or `a` element to create the button. In most cases you will not need to set this as it will be configured automatically if you use `href` or `html`. **/
    element?: string

    /** If `html` is set, this is not required. Text for the button or link. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `button` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `input`. **/
    text: string

    /** If `text` is set, this is not required. HTML for the button or link. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `button` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `input`. **/
    html: string

    /** Name for the `input` or `button`. This has no effect on `a` elements. **/
    name?: string

    /** Type of `input` or `button` – `button`, `submit` or `reset`. Defaults to `submit`. This has no effect on `a` elements. **/
    type?: string

    /** Value for the `button` tag. This has no effect on `a` or `input` elements. **/
    value?: string

    /** Whether the button should be disabled. For button and input elements, `disabled` and `aria-disabled` attributes will be set automatically. **/
    disabled?: boolean

    /** The URL that the button should link to. If this is set, `element` will be automatically set to `a` if it has not already been defined. **/
    href?: string

    /** Classes to add to the button component. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the button component. **/
    attributes?: Record<string, unknown>

    /** Modifier to increase size of the button or link **/
    largeButton?: boolean

    /** Prevent accidental double clicks on submit buttons from submitting forms multiple times **/
    preventDoubleClick?: boolean

    /** Use for the main call to action on your service's start page. **/
    isStartButton?: boolean
  }

  export default function LBCamdenButton(props: LBCamdenButtonProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/campaign-engagement-banner/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenCampaignEngagementBannerProps {
    /** Orientation of the banner **/
    orientation?: string

    /** Heading displayed **/
    heading?: string

    /** Short description displayed **/
    shortDescription?: string

    /** URL for engagement block to link to **/
    link?: string

    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>
  }

  export default function LBCamdenCampaignEngagementBanner(props: LBCamdenCampaignEngagementBannerProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/campaign-hero/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenCampaignHeroProps {
    /** Title displayed in the component **/
    title?: string

    /** Extract displayed in the component§ **/
    extract?: string

    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>
  }

  export default function LBCamdenCampaignHero(props: LBCamdenCampaignHeroProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/campaign-promo-gallery/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenCampaignPromoGalleryProps {
    /** Heading displayed **/
    heading?: string

    /** Cards displayed in the promo gallery **/
    items: Array<{
      /** The title of the card heading **/
      title: string

      /** If set, the heading will contain a link **/
      href?: string

      /** Icon for the card **/
      icon: Record<string, unknown>
    }>
  }

  export default function LBCamdenCampaignPromoGallery(props: LBCamdenCampaignPromoGalleryProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/card/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenCardProps {
    /** Classes to add to the container. **/
    classes?: string

    /** HTML element to replace the default 'div' element. **/
    element?: string

    /** HTML attributes (for example data attributes) to add to the container. **/
    attributes?: Record<string, unknown>

    /** If set, entire card will be clickable **/
    clickable?: boolean

    /** If set, this will alter the appearance of the card **/
    type?: string

    /** If set, entire card will be wrapped in a link **/
    heading: Array<{
      /** The title of the card heading **/
      title: string

      /** If set, the heading will contain a link **/
      href?: string

      /** Sets the heading level - if omitted will default to H2 **/
      headingLevel?: number
    }>

    /** If set, card body will display this value **/
    content?: {
      /** If present, the value of this attribute will be displayed in a paragraph tag **/
      text?: string

      /** If present, the value of this attribute will be displayed within the card as HTML **/
      html?: string
    }

    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>

    /** If set, the card will receive a decorative border on the top of the card **/
    topBorder?: boolean
  }

  export default function LBCamdenCard(props: LBCamdenCardProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/card-gallery/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenCardGalleryProps {
    /** Classes to add to the gallery. **/
    classes?: string

    /** Heading content of gallery. **/
    heading: string

    /** If true, render with a surrounding background color. **/
    surround?: boolean

    /** Description of the gallery. **/
    description?: string

    /** Set the heading level of card items to something other than the default h2. **/
    cardHeadingLevel?: number

    /** Cards displayed in the promo gallery **/
    items: Array<{
      /** The title of the card heading **/
      title: string

      /** If set, the heading will contain a link **/
      href?: string

      /** Short description of the card **/
      shortDescription?: string

      /** Image configuration as per LBCamden image component **/
      image: Record<string, unknown>
    }>
  }

  export default function LBCamdenCardGallery(props: LBCamdenCardGalleryProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/directory-record/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenDirectoryRecordProps {
    /** Title of record **/
    title?: string

    /** Sets an id on the record title **/
    recordId?: string

    /** Adds in an extract paragraph for 'also known as' content. **/
    alias?: string

    /** Key/Value objects for each display field **/
    items: Array<{
      /** If present, the value of this attribute will be displayed in a paragraph tag **/
      label?: string

      /** If present, the value of this attribute will be displayed within the card as HTML **/
      value?: string
    }>
  }

  export default function LBCamdenDirectoryRecord(props: LBCamdenDirectoryRecordProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/emergency-banner/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenEmergencyBannerProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Type of emergency-banner. **/
    campaignClass: string

    /** Modify styling when placed on homepage. **/
    homepage?: boolean

    /** Classes to add to the heading. **/
    headingClasses?: string

    /** Classes to add to the description. **/
    descriptionClasses?: string

    /** Heading content of banner. **/
    heading: string

    /** Short description of the emergency-banner **/
    shortDescription?: string

    /** URL of page with more information on the emergency-banner **/
    link?: string

    /** Text content of the link to emergency-banner page **/
    linkText?: string
  }

  export default function LBCamdenEmergencyBanner(props: LBCamdenEmergencyBannerProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/engagement-banner/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenEngagementBannerProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>

    /** Heading content of banner. **/
    heading: string

    /** Short description of the linked content **/
    shortDescription?: string

    /** URL of linked content **/
    link: string

    /** Text of action link to engagement content **/
    linkText: string

    /** If true, lazy-load images **/
    lazyImages?: boolean
  }

  export default function LBCamdenEngagementBanner(props: LBCamdenEngagementBannerProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/footer/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenFooterProps {
    /** Classes to add to the footer container. **/
    classes?: string

    /** Array of items for use in the primary navigation section of the footer. **/
    navigation?: Array<{
      /** List item text in the navigation section of the footer. **/
      text: string

      /** List item href attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. **/
      href: string

      /** HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. **/
      attributes?: Record<string, unknown>
    }>

    /** Array of items for use in the utility navigation section of the footer. **/
    navigationUtility?: Array<{
      /** List item text in the navigation section of the footer. **/
      text: string

      /** List item href attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. **/
      href: string

      /** HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. **/
      attributes?: Record<string, unknown>
    }>

    /** Array of items for use in the secondary navigation section of the footer. **/
    navigationSecondary?: Array<{
      /** List item text in the navigation section of the footer. **/
      text: string

      /** List item href attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. **/
      href: string

      /** HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. **/
      attributes?: Record<string, unknown>
    }>

    /** Array of items for use in the social navigation section of the footer. **/
    navigationSocial?: Array<{
      /** Title for a section. **/
      title: string

      /** Amount of columns to display items in navigation section of the footer. **/
      columns?: number

      /** Width of each navigation section in the footer. Defaults to full width. You can pass any design system grid width here, for example, 'one-third'; 'two-thirds'; 'one-half'. **/
      width?: string

      /** Array of items to display in the list in navigation section of the footer. **/
      items?: Array<{
        /** List item text in the navigation section of the footer. **/
        text: string

        /** List item href attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. **/
        href: string

        /** HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. **/
        attributes?: Record<string, unknown>
      }>
    }>
  }

  export default function LBCamdenFooter(props: LBCamdenFooterProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/guide-content/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenGuideContentProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Selector of element that should be set to page title. **/
    headingElement?: string

    /** Content displayed when no matching guide for the current hash. **/
    notFound?: {
      /** The title displayed when no matching guide for the current hash **/
      heading: string

      /** HTML content displayed no matching guide for the current hash **/
      html: string
    }

    /** Option to show the icon only (with no text). **/
    items?: Array<{
      /** The title of the guide item **/
      heading: string

      /** ID of the guide item used to show/hide from href **/
      id: string

      /** Content of the guide item **/
      html: string
    }>
  }

  export default function LBCamdenGuideContent(props: LBCamdenGuideContentProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/guide-header/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenGuideHeaderProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Option to show the icon only (with no text). **/
    items?: Array<{
      /** The title of the link **/
      text: string

      /** URL target of the link **/
      href: string
    }>
  }

  export default function LBCamdenGuideHeader(props: LBCamdenGuideHeaderProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/header/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenHeaderProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Variant of the header. Currently supported values: site-navigation **/
    variant?: string

    /** Title displayed in the header **/
    title?: string

    /** HTML attributes (for example data attributes) to add to the header container. **/
    attributes?: Record<string, unknown>

    /** If present, adds a phasebanner to the header **/
    phaseBanner?: Record<string, unknown>

    /** If present, adds html banner content before the brand bar **/
    emergencyBanner?: string

    /** Params for the search component **/
    search?: Record<string, unknown>
  }

  export default function LBCamdenHeader(props: LBCamdenHeaderProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/hero/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenHeroProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** h1 welcome message displayed at top of hero **/
    welcomeMessage?: string

    /** HTML attributes (for example data attributes) to add to the header container. **/
    attributes?: Record<string, unknown>

    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>

    /** Heading displayed above suggested links in hero **/
    linkHeading?: string

    /** Suggested links **/
    links?: unknown[]

    /** If true, switch to layout for presenting engagement content **/
    engagement?: {
      /** Heading displayed above engagement message **/
      heading?: string

      /** HTML content of engagement message **/
      content?: string

      /** URL for engagement block to link to **/
      link?: string
    }
  }

  export default function LBCamdenHero(props: LBCamdenHeroProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/image/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenImageProps {
    /** Classes to add to the image element. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the image. **/
    attributes?: Record<string, unknown>

    /** Image source used when sources array not provided, or none of the sources match **/
    src: string

    /** Alt text for the image **/
    alt?: string

    /** If true, lazy-load the image **/
    lazy?: boolean

    /** If provided, set the intrinsic width of the image **/
    width?: number

    /** If provided, set the intrinsic height of the image **/
    height?: number

    /** Assumed widths (in css units, such as px or vw) of the image onscreen. Used when selecting an image to display on the given viewport. **/
    widths?: {
      /** Assumed width (in css units) of the image when selecting a source image on mobile viewports **/
      mobile?: string

      /** Assumed width (in css units) of the image when selecting a source image on large mobile viewports **/
      mobileLarge?: string

      /** Assumed width (in css units) of the image when selecting a source image on tablet viewports **/
      tablet?: string

      /** Assumed width (in css units) of the image when selecting a source image on desktop viewports **/
      desktop?: string

      /** Assumed width (in css units) of the image when selecting a source image on wide viewports **/
      wide?: string
    }

    /** Sources for images **/
    sources?: unknown[]
  }

  export default function LBCamdenImage(props: LBCamdenImageProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/image-component/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenImageComponentProps {
    /** Image configuration as per LBCamden image component with confined ratio **/
    image: Record<string, unknown>

    /** Caption for the image **/
    caption?: string
  }

  export default function LBCamdenImageComponent(props: LBCamdenImageComponentProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/image-gallery/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenImageGalleryProps {
    /** List of images to display in the gallery **/
    items: unknown[]
  }

  export default function LBCamdenImageGallery(props: LBCamdenImageGalleryProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/info-callout/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenInfoCalloutProps {
    /** Heading displayed above engagement message **/
    heading?: string

    /** Subheading displayed above engagement message **/
    subheading?: string

    /** content of engagement banner **/
    content?: string

    /** Label for the link **/
    linkLabel?: string

    /** URL for engagement block to link to **/
    linkHreg?: string

    /** Style of the button/link **/
    buttonStyle?: string
  }

  export default function LBCamdenInfoCallout(props: LBCamdenInfoCalloutProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/lead-image/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenLeadImageProps {
    /** Image configuration as per LBCamden image component **/
    image: Record<string, unknown>
  }

  export default function LBCamdenLeadImage(props: LBCamdenLeadImageProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/link-list-gallery/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenLinkListGalleryProps {
    /** Classes to add to the gallery. **/
    classes?: string

    /** Heading content of gallery. **/
    heading?: string

    /** Description of gallery content. **/
    shortDescription?: string

    /** If true, render with a surrounding background color. **/
    surround?: boolean

    /** Cards displayed in the link list gallery **/
    items: Array<{
      /** The title of the card heading **/
      title: string

      /** Items displayed under the heading **/
      links: Array<{
        /** The title of the link **/
        title: string

        /** URL target of the link **/
        href: string
      }>
    }>
  }

  export default function LBCamdenLinkListGallery(props: LBCamdenLinkListGalleryProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/logo/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenLogoProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Hex colour value that will replace the defautl colour. **/
    fillColour?: string

    /** Option to display 'pride gradient' version of the logo **/
    pride?: boolean

    /** Option to show the icon only (with no text). **/
    icon?: boolean
  }

  export default function LBCamdenLogo(props: LBCamdenLogoProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/more-in/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenMoreInProps {
    /** Heading content of section. **/
    heading: string

    /** XXX **/
    relatedContent: unknown[]
  }

  export default function LBCamdenMoreIn(props: LBCamdenMoreInProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/promo-gallery/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenPromoGalleryProps {
    /** Classes to add to the gallery. **/
    classes?: string

    /** Heading content of gallery. **/
    heading?: string

    /** Description of gallery content. **/
    shortDescription?: string

    /** If true, render with a surrounding background color. **/
    surround?: boolean

    /** Url for 'show all' button to link to. **/
    showAllHref?: string

    /** Text to display in 'show all button'. **/
    showAllLabel?: string

    /** Cards displayed in the promo gallery **/
    items: Array<{
      /** The title of the card heading **/
      title: string

      /** If set, the heading will contain a link **/
      href?: string
    }>
  }

  export default function LBCamdenPromoGallery(props: LBCamdenPromoGalleryProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/quotation/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenQuotationProps {
    /** Colour of the quote marks **/
    colour: string

    /** Quotation text **/
    text: string

    /** Author of the quote **/
    attribution: string
  }

  export default function LBCamdenQuotation(props: LBCamdenQuotationProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/related-content-card/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenRelatedContentCardProps {
    /** Heading content of banner. **/
    heading: string

    /** Example of Related content card that appears on Article page **/
    shortDescription?: string

    /** XXX **/
    relatedContent: unknown[]
  }

  export default function LBCamdenRelatedContentCard(props: LBCamdenRelatedContentCardProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/search/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenSearchProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Option to display variant that is optimised for a darker background **/
    alt?: boolean

    /** Option to customise the label and button string value **/
    labelText?: string

    /** Option to customise the placeholder text value **/
    placeholderText?: string

    /** Value provided to search field **/
    value?: string

    /** Name attribute for the input field **/
    name?: string

    /** Action attribute for the search field **/
    action?: string

    /** Method attribute on the search field **/
    method?: string

    /** id of related results count element to reference for accessibility **/
    resultsCountId?: string

    /** Extra paramaters in object format **/
    additionalParameters?: Record<string, unknown>
  }

  export default function LBCamdenSearch(props: LBCamdenSearchProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/search-results/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenSearchResultsProps {
    /** Classes to add to the container. **/
    classes?: string

    /** Search result items. **/
    items: unknown[]
  }

  export default function LBCamdenSearchResults(props: LBCamdenSearchResultsProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/service-banner/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenServiceBannerProps {
    /** Classes to add to the header container. **/
    classes?: string

    /** Heading content of banner. **/
    heading: string

    /** Short description of the emergency-banner **/
    shortDescription?: string
  }

  export default function LBCamdenServiceBanner(props: LBCamdenServiceBannerProps): HtmlEscapedString;
}

declare module "lbcamden-frontend/lbcamden/components/video-embed/template.njk" {
  import { HtmlEscapedString } from "hono/utils/html"

  export interface LBCamdenVideoEmbedProps {
    /** Platform the video is from **/
    platform: string

    /** ID of the video **/
    id: string

    /** Title of the video frame **/
    frameTitle: string
  }

  export default function LBCamdenVideoEmbed(props: LBCamdenVideoEmbedProps): HtmlEscapedString;
}

