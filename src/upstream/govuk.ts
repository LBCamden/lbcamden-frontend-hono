import { FC } from "hono/jsx"

import GovUKAccordionTemplate from "govuk-frontend/dist/govuk/components/accordion/template.njk"

export interface GovUKAccordionProps {
  /** Must be unique across the domain of your service if `rememberExpanded` is `true` (as the expanded state of individual instances of the component persists across page loads using [session storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)). Used as an `id` in the HTML for the accordion as a whole, and also as a prefix for the `id`s of the section contents and the buttons that open them, so that those `id`s can be the target of `aria-control` attributes. **/
  id: string

  /** Heading level, from `1` to `6`. Default is `2`. **/
  headingLevel?: number

  /** Classes to add to the accordion. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the accordion. **/
  attributes?: Record<string, unknown>

  /** Whether the expanded/collapsed state of the accordion should be saved when a user leaves the page and restored when they return. Default is `true`. **/
  rememberExpanded?: boolean

  /** The text content of the 'Hide all sections' button at the top of the accordion when all sections are expanded. **/
  hideAllSectionsText?: string

  /** The text content of the 'Hide' button within each section of the accordion, which is visible when the section is expanded. **/
  hideSectionText?: string

  /** Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is expanded. Defaults to `"Hide this section"`. **/
  hideSectionAriaLabelText?: string

  /** The text content of the 'Show all sections' button at the top of the accordion when at least one section is collapsed. **/
  showAllSectionsText?: string

  /** The text content of the 'Show' button within each section of the accordion, which is visible when the section is collapsed. **/
  showSectionText?: string

  /** Text made available to assistive technologies, like screen-readers, as the final part of the toggle's accessible name when the section is collapsed. Defaults to `"Show this section"`. **/
  showSectionAriaLabelText?: string

  /** The sections within the accordion. **/
  items: Array<{
    /** The heading of each accordion section. **/
    heading: {
      /** If `html` is set, this is not required. The heading text of each section. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** If `text` is set, this is not required. The heading HTML content of each section. The header is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** The summary line of each accordion section. **/
    summary?: {
      /** The summary line text content of each section. If `html` is provided, the `text` option will be ignored. **/
      text?: string

      /** The summary line HTML content of each section. The summary line is inside the HTML `<button>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. If `html` is provided, the `text` option will be ignored. **/
      html?: string
    }

    /** The content of each accordion section. **/
    content: {
      /** If `html` is set, this is not required. The text content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** If `text` is set, this is not required. The HTML content of each section, which is hidden when the section is closed. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Sets whether the section should be expanded when the page loads for the first time. Defaults to `false`. **/
    expanded?: boolean
  }>
}

export const GovUKAccordion = GovUKAccordionTemplate as FC<GovUKAccordionProps>

import GovUKBackLinkTemplate from "govuk-frontend/dist/govuk/components/back-link/template.njk"

export interface GovUKBackLinkProps {
  /** Text to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`. **/
  text?: string

  /** HTML to use within the back link component. If `html` is provided, the `text` option will be ignored. Defaults to `"Back"`. **/
  html?: string

  /** The value of the link's `href` attribute. **/
  href: string

  /** Classes to add to the anchor tag. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the anchor tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKBackLink = GovUKBackLinkTemplate as FC<GovUKBackLinkProps>

import GovUKBreadcrumbsTemplate from "govuk-frontend/dist/govuk/components/breadcrumbs/template.njk"

export interface GovUKBreadcrumbsProps {
  /** The items within breadcrumbs. **/
  items: Array<{
    /** If `html` is set, this is not required. Text to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML to use within the breadcrumbs item. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Link for the breadcrumbs item. If not specified, breadcrumbs item is a normal list item. **/
    href?: string

    /** HTML attributes (for example data attributes) to add to the individual crumb. **/
    attributes?: Record<string, unknown>
  }>

  /** Classes to add to the breadcrumbs container. **/
  classes?: string

  /** When true, the breadcrumbs will collapse to the first and last item only on tablet breakpoint and below. **/
  collapseOnMobile?: boolean

  /** HTML attributes (for example data attributes) to add to the breadcrumbs container. **/
  attributes?: Record<string, unknown>

  /** Plain text label identifying the landmark to screen readers. Defaults to "Breadcrumb". **/
  labelText?: string
}

export const GovUKBreadcrumbs = GovUKBreadcrumbsTemplate as FC<GovUKBreadcrumbsProps>

import GovUKButtonTemplate from "govuk-frontend/dist/govuk/components/button/template.njk"

export interface GovUKButtonProps {
  /** HTML element for the button component – `input`, `button` or `a`. In most cases you will not need to set this as it will be configured automatically if `href` is provided. **/
  element?: string

  /** If `html` is set, this is not required. Text for the `input`, `button` or `a` element. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. **/
  text: string

  /** If `text` is set, this is not required. HTML for the `button` or `a` element only. If `html` is provided, the `text` option will be ignored and `element` will be automatically set to `"button"` unless `href` is also set, or it has already been defined. This option has no effect if `element` is set to `"input"`. **/
  html: string

  /** Name for the `input` or `button`. This has no effect on `a` elements. **/
  name?: string

  /** Type for the `input` or `button` element – `"button"`, `"submit"` or `"reset"`. Defaults to `"submit"`. This has no effect on `a` elements. **/
  type?: string

  /** Value for the `button` element only. This has no effect on `a` or `input` elements. **/
  value?: string

  /** Whether the button component should be disabled. For `input` and `button` elements, `disabled` and `aria-disabled` attributes will be set automatically. This has no effect on `a` elements. **/
  disabled?: boolean

  /** The URL that the button component should link to. If this is set, `element` will be automatically set to `"a"` if it has not already been defined. **/
  href?: string

  /** Classes to add to the button component. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the button component. **/
  attributes?: Record<string, unknown>

  /** Prevent accidental double clicks on submit buttons from submitting forms multiple times. **/
  preventDoubleClick?: boolean

  /** Use for the main call to action on your service's start page. **/
  isStartButton?: boolean

  /** The ID of the button. **/
  id?: string
}

export const GovUKButton = GovUKButtonTemplate as FC<GovUKButtonProps>

import GovUKCharacterCountTemplate from "govuk-frontend/dist/govuk/components/character-count/template.njk"

export interface GovUKCharacterCountProps {
  /** The ID of the textarea. Defaults to the value of `name`. **/
  id?: string

  /** The name of the textarea, which is submitted with the form data. **/
  name: string

  /** Optional number of textarea rows (default is 5 rows). **/
  rows?: string

  /** Optional initial value of the textarea. **/
  value?: string

  /** If `maxwords` is set, this is not required. The maximum number of characters. If `maxwords` is provided, the `maxlength` option will be ignored. **/
  maxlength: string

  /** If `maxlength` is set, this is not required. The maximum number of words. If `maxwords` is provided, the `maxlength` option will be ignored. **/
  maxwords: string

  /** The percentage value of the limit at which point the count message is displayed. If this attribute is set, the count message will be hidden by default. **/
  threshold?: string

  /** The label used by the character count component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to the character count component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the character count component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the character count component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the textarea used by the character count component. **/
    beforeInput?: {
      /** Text to add before the textarea. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the textarea. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the textarea used by the character count component. **/
    afterInput?: {
      /** Text to add after the textarea. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the textarea. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Classes to add to the textarea. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the textarea. **/
  attributes?: Record<string, unknown>

  /** Optional field to enable or disable the `spellcheck` attribute on the character count. **/
  spellcheck?: boolean

  /** Additional options for the count message used by the character count component. **/
  countMessage?: {
    /** Classes to add to the count message. **/
    classes?: string
  }

  /** Message made available to assistive technologies to describe that the component accepts only a limited amount of content. It is visible on the page when JavaScript is unavailable. The component will replace the `%{count}` placeholder with the value of the `maxlength` or `maxwords` parameter. **/
  textareaDescriptionText?: string

  /** Message displayed when the number of characters is under the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining characters. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). **/
  charactersUnderLimitText?: Record<string, unknown>

  /** Message displayed when the number of characters reaches the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. **/
  charactersAtLimitText?: string

  /** Message displayed when the number of characters is over the configured maximum, `maxlength`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum.[Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). **/
  charactersOverLimitText?: Record<string, unknown>

  /** Message displayed when the number of words is under the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of remaining words. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). **/
  wordsUnderLimitText?: Record<string, unknown>

  /** Message displayed when the number of words reaches the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. **/
  wordsAtLimitText?: string

  /** Message displayed when the number of words is over the configured maximum, `maxwords`. This message is displayed visually and through assistive technologies. The component will replace the `%{count}` placeholder with the number of characters above the maximum. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). **/
  wordsOverLimitText?: Record<string, unknown>
}

export const GovUKCharacterCount = GovUKCharacterCountTemplate as FC<GovUKCharacterCountProps>

import GovUKCheckboxesTemplate from "govuk-frontend/dist/govuk/components/checkboxes/template.njk"

export interface GovUKCheckboxesProps {
  /** One or more element IDs to add to the input `aria-describedby` attribute without a fieldset, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** Can be used to add a fieldset to the checkboxes component. **/
  fieldset?: Record<string, unknown>

  /** Can be used to add a hint to the checkboxes component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the checkboxes component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the checkboxes component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before all checkbox items within the checkboxes component. **/
    beforeInputs?: {
      /** Text to add before all checkbox items. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before all checkbox items. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after all checkbox items within the checkboxes component. **/
    afterInputs?: {
      /** Text to add after all checkbox items. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after all checkbox items. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Optional prefix. This is used to prefix the `id` attribute for each checkbox item input, hint and error message, separated by `-`. Defaults to the `name` option value. **/
  idPrefix?: string

  /** Name attribute for all checkbox items. **/
  name: string

  /** The checkbox items within the checkboxes component. **/
  items: Array<{
    /** If `html` is set, this is not required. Text to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML to use within each checkbox item label. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Specific ID attribute for the checkbox item. If omitted, then component global `idPrefix` option will be applied. **/
    id?: string

    /** Specific name for the checkbox item. If omitted, then component global `name` string will be applied. **/
    name?: string

    /** Value for the checkbox input. **/
    value: string

    /** Subset of options for the label used by each checkbox item within the checkboxes component. **/
    label?: {
      /** Classes to add to the label tag. **/
      classes?: string

      /** HTML attributes (for example data attributes) to add to the label tag. **/
      attributes?: Record<string, unknown>
    }

    /** Can be used to add a hint to each checkbox item within the checkboxes component. **/
    hint?: Record<string, unknown>

    /** Divider text to separate checkbox items, for example the text `"or"`. **/
    divider?: string

    /** Whether the checkbox should be checked when the page loads. Takes precedence over the top-level `values` option. **/
    checked?: boolean

    /** Provide additional content to reveal when the checkbox is checked. **/
    conditional?: {
      /** The HTML to reveal when the checkbox is checked. **/
      html: string
    }

    /** If set to `"exclusive"`, implements a 'None of these' type behaviour via JavaScript when checkboxes are clicked. **/
    behaviour?: string

    /** If `true`, checkbox will be disabled. **/
    disabled?: boolean

    /** HTML attributes (for example data attributes) to add to the checkbox input tag. **/
    attributes?: Record<string, unknown>
  }>

  /** Array of values for checkboxes which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item. **/
  values?: unknown[]

  /** Classes to add to the checkboxes container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the anchor tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKCheckboxes = GovUKCheckboxesTemplate as FC<GovUKCheckboxesProps>

import GovUKCookieBannerTemplate from "govuk-frontend/dist/govuk/components/cookie-banner/template.njk"

export interface GovUKCookieBannerProps {
  /** The text for the `aria-label` which labels the cookie banner region. This region applies to all messages that the cookie banner includes. For example, the cookie message and the confirmation message. Defaults to `"Cookie banner"`. **/
  ariaLabel?: string

  /** Defaults to `false`. If you set this option to `true`, the whole cookie banner is hidden, including all messages within the banner. You can use `hidden` for client-side implementations where the cookie banner HTML is present, but hidden until the cookie banner is shown using JavaScript. **/
  hidden?: boolean

  /** The additional classes that you want to add to the cookie banner. **/
  classes?: string

  /** The additional attributes that you want to add to the cookie banner. For example, data attributes. **/
  attributes?: Record<string, unknown>

  /** The different messages you can pass into the cookie banner. For example, the cookie message and the confirmation message. **/
  messages: Array<{
    /** The heading text that displays in the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored. **/
    headingText?: string

    /** The heading HTML to use within the message. You can use any string with this option. If you set `headingHtml`, `headingText` is ignored. If you are not passing HTML, use `headingText`. **/
    headingHtml?: string

    /** The text for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored. **/
    text: string

    /** The HTML for the main content within the message. You can use any string with this option. If you set `html`, `text` is not required and is ignored. If you are not passing HTML, use `text`. **/
    html: string

    /** The buttons and links that you want to display in the message. `actions` defaults to `"button"` unless you set `href`, which renders the action as a link. **/
    actions?: Array<{
      /** The button or link text. **/
      text: string

      /** The type of button – `"button"` or `"submit"`. If `href` is provided, set `type` to `"button"` render a link styled as a button. **/
      type?: string

      /** The `href` for a link. Set `type` to `"button"` and set `href` to render a link styled as a button. **/
      href?: string

      /** The name attribute for the button. Does not apply if you set `href`, which makes a link. **/
      name?: string

      /** The value attribute for the button. Does not apply if you set `href`, which makes a link. **/
      value?: string

      /** The additional classes that you want to add to the button or link. **/
      classes?: string

      /** The additional attributes that you want to add to the button or link. For example, data attributes. **/
      attributes?: Record<string, unknown>
    }>

    /** Defaults to `false`. If you set it to `true`, the message is hidden. You can use `hidden` for client-side implementations where the confirmation message HTML is present, but hidden on the page. **/
    hidden?: boolean

    /** Set `role` to `"alert"` on confirmation messages to allow assistive tech to automatically read the message. You will also need to move focus to the confirmation message using JavaScript you have written yourself. **/
    role?: string

    /** The additional classes that you want to add to the message. **/
    classes?: string

    /** The additional attributes that you want to add to the message. For example, data attributes. **/
    attributes?: Record<string, unknown>
  }>
}

export const GovUKCookieBanner = GovUKCookieBannerTemplate as FC<GovUKCookieBannerProps>

import GovUKDateInputTemplate from "govuk-frontend/dist/govuk/components/date-input/template.njk"

export interface GovUKDateInputProps {
  /** This is used for the main component and to compose the ID attribute for each item. **/
  id: string

  /** Optional prefix. This is used to prefix each item `name`, separated by `-`. **/
  namePrefix?: string

  /** The inputs within the date input component. **/
  items?: Array<{
    /** Item-specific ID. If provided, it will be used instead of the generated ID. **/
    id?: string

    /** Item-specific name attribute. **/
    name: string

    /** Item-specific label text. If provided, this will be used instead of `name` for item label text. **/
    label?: string

    /** If provided, it will be used as the initial value of the input. **/
    value?: string

    /** Attribute to meet [WCAG success criterion 1.3.5: Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See the [Autofill section in the HTML standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) section in the HTML standard for full list of attributes that can be used. **/
    autocomplete?: string

    /** Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute), used to match allowed character combinations for the input value. **/
    pattern?: string

    /** Classes to add to date input item. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the date input tag. **/
    attributes?: Record<string, unknown>
  }>

  /** Can be used to add a hint to a date input component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the date input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the date input component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the inputs used by the date input component. **/
    beforeInputs?: {
      /** Text to add before the inputs. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the inputs. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the inputs used by the date input component. **/
    afterInputs?: {
      /** Text to add after the inputs. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the inputs. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Can be used to add a fieldset to the date input component. **/
  fieldset?: Record<string, unknown>

  /** Classes to add to the date-input container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the date-input container. **/
  attributes?: Record<string, unknown>
}

export const GovUKDateInput = GovUKDateInputTemplate as FC<GovUKDateInputProps>

import GovUKDetailsTemplate from "govuk-frontend/dist/govuk/components/details/template.njk"

export interface GovUKDetailsProps {
  /** If `summmaryHtml` is set, this is not required. Text to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored. **/
  summaryText: string

  /** If `summmaryText` is set, this is not required. HTML to use within the summary element (the visible part of the details element). If `summaryHtml` is provided, the `summaryText` option will be ignored. **/
  summaryHtml: string

  /** If `html` is set, this is not required. Text to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the disclosed part of the details element. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** ID to add to the details element. **/
  id?: string

  /** If `true`, details element will be expanded. **/
  open?: boolean

  /** Classes to add to the `<details>` element. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the `<details>` element. **/
  attributes?: Record<string, unknown>
}

export const GovUKDetails = GovUKDetailsTemplate as FC<GovUKDetailsProps>

import GovUKErrorMessageTemplate from "govuk-frontend/dist/govuk/components/error-message/template.njk"

export interface GovUKErrorMessageProps {
  /** If `html` is set, this is not required. Text to use within the error message. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the error message. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** ID attribute to add to the error message `<p>` tag. **/
  id?: string

  /** Classes to add to the error message `<p>` tag. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the error message `<p>` tag. **/
  attributes?: Record<string, unknown>

  /** A visually hidden prefix used before the error message. Defaults to `"Error"`. **/
  visuallyHiddenText?: string
}

export const GovUKErrorMessage = GovUKErrorMessageTemplate as FC<GovUKErrorMessageProps>

import GovUKErrorSummaryTemplate from "govuk-frontend/dist/govuk/components/error-summary/template.njk"

export interface GovUKErrorSummaryProps {
  /** If `titleHtml` is set, this is not required. Text to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored. **/
  titleText: string

  /** If `titleText` is set, this is not required. HTML to use for the heading of the error summary block. If `titleHtml` is provided, `titleText` will be ignored. **/
  titleHtml: string

  /** Text to use for the description of the errors. If you set `descriptionHtml`, the component will ignore `descriptionText`. **/
  descriptionText?: string

  /** HTML to use for the description of the errors. If you set this option, the component will ignore `descriptionText`. **/
  descriptionHtml?: string

  /** A list of errors to include in the error summary. **/
  errorList?: Array<{
    /** Href attribute for the error link item. If provided item will be an anchor. **/
    href?: string

    /** If `html` is set, this is not required. Text for the error link item. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML for the error link item. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** HTML attributes (for example data attributes) to add to the error link anchor. **/
    attributes?: Record<string, unknown>
  }>

  /** Prevent moving focus to the error summary when the page loads. **/
  disableAutoFocus?: boolean

  /** Classes to add to the error-summary container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the error-summary container. **/
  attributes?: Record<string, unknown>
}

export const GovUKErrorSummary = GovUKErrorSummaryTemplate as FC<GovUKErrorSummaryProps>

import GovUKExitThisPageTemplate from "govuk-frontend/dist/govuk/components/exit-this-page/template.njk"

export interface GovUKExitThisPageProps {
  /** Text for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden. **/
  text?: string

  /** HTML for the link. If `html` is provided, the `text` option will be ignored. Defaults to `"Emergency Exit this page"` with 'Emergency' visually hidden. **/
  html?: string

  /** URL to redirect the current tab to. Defaults to `"https://www.bbc.co.uk/weather"`. **/
  redirectUrl?: string

  /** ID attribute to add to the exit this page container. **/
  id?: string

  /** Classes to add to the exit this page container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the exit this page container. **/
  attributes?: Record<string, unknown>

  /** Text announced by screen readers when Exit this Page has been activated via the keyboard shortcut. Defaults to `"Loading."`. **/
  activatedText?: string

  /** Text announced by screen readers when the keyboard shortcut has timed out without successful activation. Defaults to `"Exit this page expired."`. **/
  timedOutText?: string

  /** Text announced by screen readers when the user must press <kbd>Shift</kbd> two more times to activate the button. Defaults to `"Shift, press 2 more times to exit."`. **/
  pressTwoMoreTimesText?: string

  /** Text announced by screen readers when the user must press <kbd>Shift</kbd> one more time to activate the button. Defaults to `"Shift, press 1 more time to exit."`. **/
  pressOneMoreTimeText?: string
}

export const GovUKExitThisPage = GovUKExitThisPageTemplate as FC<GovUKExitThisPageProps>

import GovUKFieldsetTemplate from "govuk-frontend/dist/govuk/components/fieldset/template.njk"

export interface GovUKFieldsetProps {
  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The legend for the fieldset component. **/
  legend?: {
    /** If `html` is set, this is not required. Text to use within the legend. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML to use within the legend. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Classes to add to the legend. **/
    classes?: string

    /** Whether the legend also acts as the heading for the page. **/
    isPageHeading?: boolean
  }

  /** Classes to add to the fieldset container. **/
  classes?: string

  /** Optional ARIA role attribute. **/
  role?: string

  /** HTML attributes (for example data attributes) to add to the fieldset container. **/
  attributes?: Record<string, unknown>

  /** HTML to use/render within the fieldset element. **/
  html?: string
}

export const GovUKFieldset = GovUKFieldsetTemplate as FC<GovUKFieldsetProps>

import GovUKFileUploadTemplate from "govuk-frontend/dist/govuk/components/file-upload/template.njk"

export interface GovUKFileUploadProps {
  /** The name of the input, which is submitted with the form data. **/
  name: string

  /** The ID of the input. Defaults to the value of `name`. **/
  id?: string

  /** Optional initial value of the input. **/
  value?: string

  /** If `true`, file input will be disabled. **/
  disabled?: boolean

  /** If `true`, a user may select multiple files at the same time. The exact mechanism to do this differs depending on operating system. **/
  multiple?: boolean

  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The label used by the file upload component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to the file upload component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the file upload component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the file upload component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the input used by the file upload component. **/
    beforeInput?: {
      /** Text to add before the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the input used by the file upload component. **/
    afterInput?: {
      /** Text to add after the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Can be used to enable JavaScript enhancements for the component. **/
  javascript?: boolean

  /** The text of the button that opens the file picker. Default is `"Choose file"`. If `javascript` is not provided, this option will be ignored. **/
  chooseFilesButtonText?: string

  /** The text informing users they can drop files. Default is `"or drop file"`. If `javascript` is not provided, this option will be ignored. **/
  dropInstructionText?: string

  /** The text displayed when multiple files have been chosen by the user. The component will replace the `%{count}` placeholder with the number of files selected. [Our pluralisation rules apply to this macro option](https://frontend.design-system.service.gov.uk/localise-govuk-frontend/#understanding-pluralisation-rules). If `javascript` is not provided, this option will be ignored. **/
  multipleFilesChosenText?: Record<string, unknown>

  /** The text displayed when no file has been chosen by the user. Default is `"No file chosen"`. If `javascript` is not provided, this option will be ignored. **/
  noFileChosenText?: string

  /** The text announced by assistive technology when user drags files and enters the drop zone. Default is `"Entered drop zone"`. If `javascript` is not provided, this option will be ignored. **/
  enteredDropZoneText?: string

  /** The text announced by assistive technology when user drags files and leaves the drop zone without dropping. Default is `"Left drop zone"`. If `javascript` is not provided, this option will be ignored. **/
  leftDropZoneText?: string

  /** Classes to add to the file upload component. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the file upload component. **/
  attributes?: Record<string, unknown>
}

export const GovUKFileUpload = GovUKFileUploadTemplate as FC<GovUKFileUploadProps>

import GovUKFooterTemplate from "govuk-frontend/dist/govuk/components/footer/template.njk"

export interface GovUKFooterProps {
  /** The meta section of the footer after any navigation, before the copyright and license information. **/
  meta?: {
    /** Title for a meta item section. Defaults to `"Support links"`. **/
    visuallyHiddenTitle?: string

    /** HTML to add to the meta section of the footer, which will appear below any links specified using meta `items`. **/
    html?: string

    /** Text to add to the meta section of the footer, which will appear below any links specified using meta `items`. If meta `html` is specified, this option is ignored. **/
    text?: string

    /** The meta `items` add content within a unordered list to the meta section of the footer component. These appear above any text or custom html in the meta section. **/
    items?: Array<{
      /** List item text in the meta section of the footer. **/
      text: string

      /** List item link `href` attribute in the meta section of the footer. **/
      href: string

      /** HTML attributes (for example data attributes) to add to the anchor in the footer meta section. **/
      attributes?: Record<string, unknown>
    }>
  }

  /** The navigation section of the footer before a section break and the copyright and license information. **/
  navigation?: Array<{
    /** Title for a section. **/
    title: string

    /** Amount of columns to display items in navigation section of the footer. **/
    columns?: number

    /** Width of each navigation section in the footer. You can pass any Design System grid width here – for example, `"one-third"`, `"two-thirds"` or `"one-half"`. Defaults to `"full"`. **/
    width?: string

    /** The items within the navigation section of the footer component. **/
    items?: Array<{
      /** List item text in the navigation section of the footer. **/
      text: string

      /** List item link `href` attribute in the navigation section of the footer. Both `text` and `href` attributes need to be present to create a link. **/
      href: string

      /** HTML attributes (for example data attributes) to add to the anchor in the footer navigation section. **/
      attributes?: Record<string, unknown>
    }>
  }>

  /** The content licence information within the footer component. Defaults to Open Government Licence (OGL) v3 licence. **/
  contentLicence?: {
    /** If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used. **/
    text?: string

    /** If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, the text for the Open Government Licence is used. The content licence is inside a `<span>` element, so you can only add [phrasing content](https://html.spec.whatwg.org/#phrasing-content) to it. **/
    html?: string
  }

  /** The copyright information in the footer component, this defaults to `"© Crown copyright"`. **/
  copyright?: {
    /** If `html` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used. **/
    text?: string

    /** If `text` is set, this is not required. If `html` is provided, the `text` option will be ignored. If neither are provided, `"© Crown copyright"` is used. The copyright notice is inside an `<a>` element, so you can only use text formatting elements within it. **/
    html?: string
  }

  /** Classes that can be added to the inner container, useful if you want to make the footer full width. **/
  containerClasses?: string

  /** Classes to add to the footer component container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the footer component container. **/
  attributes?: Record<string, unknown>
}

export const GovUKFooter = GovUKFooterTemplate as FC<GovUKFooterProps>

import GovUKHeaderTemplate from "govuk-frontend/dist/govuk/components/header/template.njk"

export interface GovUKHeaderProps {
  /** The URL of the homepage. Defaults to `"/"`. **/
  homepageUrl?: string

  /** Product name, used when the product name follows on directly from ‘GOV.UK’. For example, GOV.UK Pay or GOV.UK Design System. In most circumstances, you should use `serviceName`. **/
  productName?: string

  /** The name of your service, included in the header. **/
  serviceName?: string

  /** URL for the service name anchor. **/
  serviceUrl?: string

  /** Can be used to add navigation to the header component. **/
  navigation?: Array<{
    /** Text for the navigation item. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** HTML for the navigation item. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** URL of the navigation item anchor. **/
    href?: string

    /** Flag to mark the navigation item as active or not. **/
    active?: boolean

    /** HTML attributes (for example data attributes) to add to the navigation item anchor. **/
    attributes?: Record<string, unknown>
  }>

  /** Classes for the navigation section of the header. **/
  navigationClasses?: string

  /** Text for the `aria-label` attribute of the navigation. Defaults to the same value as `menuButtonText`. **/
  navigationLabel?: string

  /** Text for the `aria-label` attribute of the button that opens the mobile navigation, if there is a mobile navigation menu. **/
  menuButtonLabel?: string

  /** Text of the button that opens the mobile navigation menu, if there is a mobile navigation menu. There is no enforced character limit, but there is a limited display space so keep text as short as possible. By default, this is set to 'Menu'. **/
  menuButtonText?: string

  /** Classes for the container, useful if you want to make the header fixed width. **/
  containerClasses?: string

  /** Classes to add to the header container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the header container. **/
  attributes?: Record<string, unknown>

  /** If `true`, uses the Tudor crown from King Charles III's royal cypher. Otherwise, uses the St. Edward's crown. Default is `true`. **/
  useTudorCrown?: boolean
}

export const GovUKHeader = GovUKHeaderTemplate as FC<GovUKHeaderProps>

import GovUKHintTemplate from "govuk-frontend/dist/govuk/components/hint/template.njk"

export interface GovUKHintProps {
  /** If `html` is set, this is not required. Text to use within the hint. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the hint. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** Optional ID attribute to add to the hint span tag. **/
  id?: string

  /** Classes to add to the hint span tag. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the hint span tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKHint = GovUKHintTemplate as FC<GovUKHintProps>

import GovUKInputTemplate from "govuk-frontend/dist/govuk/components/input/template.njk"

export interface GovUKInputProps {
  /** The ID of the input. Defaults to the value of `name`. **/
  id?: string

  /** The name of the input, which is submitted with the form data. **/
  name: string

  /** Type of input control to render, for example, a password input control. Defaults to `"text"`. **/
  type?: string

  /** Optional value for [the inputmode attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode). **/
  inputmode?: string

  /** Optional initial value of the input. **/
  value?: string

  /** If `true`, input will be disabled. **/
  disabled?: boolean

  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The label used by the text input component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to a text input component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Can be used to add a prefix to the text input component. **/
  prefix?: {
    /** Required. If `html` is set, this is not required. Text to use within the prefix. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** Required. If `text` is set, this is not required. HTML to use within the prefix. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Classes to add to the prefix. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the prefix element. **/
    attributes?: Record<string, unknown>
  }

  /** Can be used to add a suffix to the text input component. **/
  suffix?: {
    /** If `html` is set, this is not required. Text to use within the suffix. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML to use within the suffix. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Classes to add to the suffix element. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the suffix element. **/
    attributes?: Record<string, unknown>
  }

  /** Additional options for the form group containing the text input component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the input used by the text input component. **/
    beforeInput?: {
      /** Text to add before the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the input used by the text input component. **/
    afterInput?: {
      /** Text to add after the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Classes to add to the input. **/
  classes?: string

  /** Attribute to meet [WCAG success criterion 1.3.5: Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See the [Autofill section in the HTML standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) section in the HTML standard for full list of attributes that can be used. **/
  autocomplete?: string

  /** Attribute to [provide a regular expression pattern](https://html.spec.whatwg.org/multipage/input.html#the-pattern-attribute), used to match allowed character combinations for the input value. **/
  pattern?: string

  /** Optional field to enable or disable the `spellcheck` attribute on the input. **/
  spellcheck?: boolean

  /** Optional field to enable or disable autocapitalisation of user input. [See the Autocapitalization section in the HTML spec](https://html.spec.whatwg.org/multipage/interaction.html#autocapitalization) for a full list of values that can be used. **/
  autocapitalize?: string

  /** If any of `prefix`, `suffix`, `formGroup.beforeInput` or `formGroup.afterInput` have a value, a wrapping element is added around the input and inserted content. This object allows you to customise that wrapping element. **/
  inputWrapper?: {
    /** Classes to add to the wrapping element. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the wrapping element. **/
    attributes?: Record<string, unknown>
  }

  /** HTML attributes (for example data attributes) to add to the input. **/
  attributes?: Record<string, unknown>
}

export const GovUKInput = GovUKInputTemplate as FC<GovUKInputProps>

import GovUKInsetTextTemplate from "govuk-frontend/dist/govuk/components/inset-text/template.njk"

export interface GovUKInsetTextProps {
  /** If `html` is set, this is not required. Text to use within the inset text component. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the inset text component. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** ID attribute to add to the inset text container. **/
  id?: string

  /** Classes to add to the inset text container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the inset text container. **/
  attributes?: Record<string, unknown>
}

export const GovUKInsetText = GovUKInsetTextTemplate as FC<GovUKInsetTextProps>

import GovUKLabelTemplate from "govuk-frontend/dist/govuk/components/label/template.njk"

export interface GovUKLabelProps {
  /** If `html` is set, this is not required. Text to use within the label. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the label. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** The value of the `for` attribute, the ID of the input the label is associated with. **/
  for?: string

  /** Whether the label also acts as the heading for the page. **/
  isPageHeading?: boolean

  /** Classes to add to the label tag. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the label tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKLabel = GovUKLabelTemplate as FC<GovUKLabelProps>

import GovUKNotificationBannerTemplate from "govuk-frontend/dist/govuk/components/notification-banner/template.njk"

export interface GovUKNotificationBannerProps {
  /** The text that displays in the notification banner. You can use any string with this option. If you set `html`, this option is not required and is ignored. **/
  text: string

  /** The HTML to use within the notification banner. You can use any string with this option. If you set `html`, `text` is not required and is ignored. **/
  html: string

  /** The title text that displays in the notification banner. You can use any string with this option. Use this option to set text that does not contain HTML. The available default values are 'Important', 'Success', and null:
 - if you do not set `type`, `titleText` defaults to `"Important"`
 - if you set `type` to `success`, `titleText` defaults to `"Success"`
 - if you set `titleHtml`, this option is ignored
  **/
  titleText?: string

  /** The title HTML to use within the notification banner. You can use any string with this option. Use this option to set text that contains HTML. If you set `titleHtml`, the `titleText` option is ignored. **/
  titleHtml?: string

  /** Sets heading level for the title only. You can only use values between `1` and `6` with this option. The default is `2`. **/
  titleHeadingLevel?: string

  /** The type of notification to render. You can use only `"success"` or `null` values with this option. If you set `type` to `"success"`, the notification banner sets `role` to `"alert"`. JavaScript then moves the keyboard focus to the notification banner when the page loads. If you do not set `type`, the notification banner sets `role` to `"region"`. **/
  type?: string

  /** Overrides the value of the `role` attribute for the notification banner. Defaults to `"region"`. If you set `type` to `"success"`, `role` defaults to `"alert"`. **/
  role?: string

  /** The `id` for the banner title, and the `aria-labelledby` attribute in the banner. Defaults to `"govuk-notification-banner-title"`. **/
  titleId?: string

  /** If you set `type` to `"success"`, or `role` to `"alert"`, JavaScript moves the keyboard focus to the notification banner when the page loads. To disable this behaviour, set `disableAutoFocus` to `true`. **/
  disableAutoFocus?: boolean

  /** The classes that you want to add to the notification banner. **/
  classes?: string

  /** The HTML attributes that you want to add to the notification banner, for example, data attributes. **/
  attributes?: Record<string, unknown>
}

export const GovUKNotificationBanner = GovUKNotificationBannerTemplate as FC<GovUKNotificationBannerProps>

import GovUKPaginationTemplate from "govuk-frontend/dist/govuk/components/pagination/template.njk"

export interface GovUKPaginationProps {
  /** The items within the pagination component. **/
  items?: Array<{
    /** The pagination item text – usually a page number. **/
    number?: string

    /** The visually hidden label (for the pagination item) which will be applied to an `aria-label` and announced by screen readers on the pagination item link. Should include page number. **/
    visuallyHiddenText?: string

    /** The link's URL. **/
    href: string

    /** Set to `true` to indicate the current page the user is on. **/
    current?: boolean

    /** Use this option if you want to specify an ellipsis at a given point between numbers. If you set this option as `true`, any other options for the item are ignored. **/
    ellipsis?: boolean

    /** The HTML attributes (for example, data attributes) you want to add to the anchor. **/
    attributes?: Record<string, unknown>
  }>

  /** A link to the previous page, if there is a previous page. **/
  previous?: {
    /** The text content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. **/
    text?: string

    /** The HTML content of the link to the previous page. Defaults to `"Previous page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. **/
    html?: string

    /** The optional label that goes underneath the link to the previous page, providing further context for the user about where the link goes. **/
    labelText?: string

    /** The previous page's URL. **/
    href: string

    /** The HTML attributes (for example, data attributes) you want to add to the anchor. **/
    attributes?: Record<string, unknown>
  }

  /** A link to the next page, if there is a next page. **/
  next?: {
    /** The text content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. **/
    text?: string

    /** The HTML content of the link to the next page. Defaults to `"Next page"`, with 'page' being visually hidden. If `html` is provided, the `text` option will be ignored. **/
    html?: string

    /** The optional label that goes underneath the link to the next page, providing further context for the user about where the link goes. **/
    labelText?: string

    /** The next page's URL. **/
    href: string

    /** The HTML attributes (for example, data attributes) you want to add to the anchor. **/
    attributes?: Record<string, unknown>
  }

  /** The label for the navigation landmark that wraps the pagination. Defaults to `"Pagination"`. **/
  landmarkLabel?: string

  /** The classes you want to add to the pagination `nav` parent. **/
  classes?: string

  /** The HTML attributes (for example, data attributes) you want to add to the pagination `nav` parent. **/
  attributes?: Record<string, unknown>
}

export const GovUKPagination = GovUKPaginationTemplate as FC<GovUKPaginationProps>

import GovUKPanelTemplate from "govuk-frontend/dist/govuk/components/panel/template.njk"

export interface GovUKPanelProps {
  /** If `titleHtml` is set, this is not required. Text to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored. **/
  titleText: string

  /** If `titleText` is set, this is not required. HTML to use within the panel. If `titleHtml` is provided, the `titleText` option will be ignored. **/
  titleHtml: string

  /** Heading level, from `1` to `6`. Default is `1`. **/
  headingLevel?: number

  /** If `html` is set, this is not required. Text to use within the panel content. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the panel content. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** Classes to add to the panel container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the panel container. **/
  attributes?: Record<string, unknown>
}

export const GovUKPanel = GovUKPanelTemplate as FC<GovUKPanelProps>

import GovUKPasswordInputTemplate from "govuk-frontend/dist/govuk/components/password-input/template.njk"

export interface GovUKPasswordInputProps {
  /** The ID of the input. Defaults to the value of `name`. **/
  id?: string

  /** The name of the input, which is submitted with the form data. **/
  name: string

  /** Optional initial value of the input. **/
  value?: string

  /** If `true`, input will be disabled. **/
  disabled?: boolean

  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The label used by the text input component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to a text input component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the text input component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the text input component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the input used by the text input component. **/
    beforeInput?: {
      /** Text to add before the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the input used by the text input component. **/
    afterInput?: {
      /** Text to add after the input. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the input. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Classes to add to the input. **/
  classes?: string

  /** Attribute to meet [WCAG success criterion 1.3.5: Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html). See the [Autofill section in the HTML standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) for full list of attributes that can be used. Default is `"current-password"`. **/
  autocomplete?: string

  /** HTML attributes (for example data attributes) to add to the input. **/
  attributes?: Record<string, unknown>

  /** Button text when the password is hidden. Defaults to `"Show"`. **/
  showPasswordText?: string

  /** Button text when the password is visible. Defaults to `"Hide"`. **/
  hidePasswordText?: string

  /** Button text exposed to assistive technologies, like screen readers, when the password is hidden. Defaults to `"Show password"`. **/
  showPasswordAriaLabelText?: string

  /** Button text exposed to assistive technologies, like screen readers, when the password is visible. Defaults to `"Hide password"`. **/
  hidePasswordAriaLabelText?: string

  /** Announcement made to screen reader users when their password has become visible in plain text. Defaults to `"Your password is visible"`. **/
  passwordShownAnnouncementText?: string

  /** Announcement made to screen reader users when their password has been obscured and is not visible. Defaults to `"Your password is hidden"`. **/
  passwordHiddenAnnouncementText?: string

  /** Optional object allowing customisation of the toggle button. **/
  button?: {
    /** Classes to add to the button. **/
    classes?: string
  }
}

export const GovUKPasswordInput = GovUKPasswordInputTemplate as FC<GovUKPasswordInputProps>

import GovUKPhaseBannerTemplate from "govuk-frontend/dist/govuk/components/phase-banner/template.njk"

export interface GovUKPhaseBannerProps {
  /** If `html` is set, this is not required. Text to use within the phase banner. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the phase banner. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** The tag used by the phase banner component. **/
  tag: Record<string, unknown>

  /** Classes to add to the phase banner container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the phase banner container. **/
  attributes?: Record<string, unknown>
}

export const GovUKPhaseBanner = GovUKPhaseBannerTemplate as FC<GovUKPhaseBannerProps>

import GovUKRadiosTemplate from "govuk-frontend/dist/govuk/components/radios/template.njk"

export interface GovUKRadiosProps {
  /** The fieldset used by the radios component. **/
  fieldset?: Record<string, unknown>

  /** Can be used to add a hint to the radios component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the radios component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the radios component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before all radio items within the checkboxes component. **/
    beforeInputs?: {
      /** Text to add before all radio items. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before all radio items. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after all radio items within the checkboxes component. **/
    afterInputs?: {
      /** Text to add after all radio items. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after all radio items. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Optional prefix. This is used to prefix the `id` attribute for each radio input, hint and error message, separated by `-`. Defaults to the `name` option value. **/
  idPrefix?: string

  /** Name attribute for the radio items. **/
  name: string

  /** The radio items within the radios component. **/
  items: Array<{
    /** If `html` is set, this is not required. Text to use within each radio item label. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML to use within each radio item label. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Specific ID attribute for the radio item. If omitted, then `idPrefix` string will be applied. **/
    id?: string

    /** Value for the radio input. **/
    value: string

    /** Subset of options for the label used by each radio item within the radios component. **/
    label?: {
      /** Classes to add to the label tag. **/
      classes?: string

      /** HTML attributes (for example data attributes) to add to the label tag. **/
      attributes?: Record<string, unknown>
    }

    /** Can be used to add a hint to each radio item within the radios component. **/
    hint?: Record<string, unknown>

    /** Divider text to separate radio items, for example the text `"or"`. **/
    divider?: string

    /** Whether the radio should be checked when the page loads. Takes precedence over the top-level `value` option. **/
    checked?: boolean

    /** Provide additional content to reveal when the radio is checked. **/
    conditional?: {
      /** The HTML to reveal when the radio is checked. **/
      html: string
    }

    /** If `true`, radio will be disabled. **/
    disabled?: boolean

    /** HTML attributes (for example data attributes) to add to the radio input tag. **/
    attributes?: Record<string, unknown>
  }>

  /** The value for the radio which should be checked when the page loads. Use this as an alternative to setting the `checked` option on each individual item. **/
  value?: string

  /** Classes to add to the radio container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the radio input tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKRadios = GovUKRadiosTemplate as FC<GovUKRadiosProps>

import GovUKSelectTemplate from "govuk-frontend/dist/govuk/components/select/template.njk"

export interface GovUKSelectProps {
  /** ID for the select box. Defaults to the value of `name`. **/
  id?: string

  /** Name property for the select. **/
  name: string

  /** The items within the select component. **/
  items: Array<{
    /** Value for the option. If this is omitted, the value is taken from the text content of the option element. **/
    value?: string

    /** Text for the option item. **/
    text: string

    /** Whether the option should be selected when the page loads. Takes precedence over the top-level `value` option. **/
    selected?: boolean

    /** Sets the option item as disabled. **/
    disabled?: boolean

    /** HTML attributes (for example data attributes) to add to the option. **/
    attributes?: Record<string, unknown>
  }>

  /** Value for the option which should be selected. Use this as an alternative to setting the `selected` option on each individual item. **/
  value?: string

  /** If `true`, select box will be disabled. Use the `disabled` option on each individual item to only disable certain options. **/
  disabled?: boolean

  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The label used by the select component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to the select component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the select component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the select component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the select used by the select component. **/
    beforeInput?: {
      /** Text to add before the select. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the select. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the select used by the select component. **/
    afterInput?: {
      /** Text to add after the select. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the select. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Classes to add to the select. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the select. **/
  attributes?: Record<string, unknown>
}

export const GovUKSelect = GovUKSelectTemplate as FC<GovUKSelectProps>

import GovUKServiceNavigationTemplate from "govuk-frontend/dist/govuk/components/service-navigation/template.njk"

export interface GovUKServiceNavigationProps {
  /** Classes to add to the service navigation container. **/
  classes?: string

  /** HTML attributes (for example, data attributes) to add to the service navigation container. **/
  attributes?: Record<string, unknown>

  /** The text for the `aria-label` which labels the service navigation container when a service name is included. Defaults to `"Service information"`. **/
  ariaLabel?: string

  /** The text of the mobile navigation menu toggle. **/
  menuButtonText?: string

  /** The screen reader label for the mobile navigation menu toggle. Defaults to the same value as `menuButtonText` if not specified. **/
  menuButtonLabel?: string

  /** The screen reader label for the mobile navigation menu. Defaults to the same value as `menuButtonText` if not specified. **/
  navigationLabel?: string

  /** The ID used to associate the mobile navigation toggle with the navigation menu. Defaults to `navigation`. **/
  navigationId?: string

  /** Classes to add to the navigation menu container. **/
  navigationClasses?: string

  /** The name of your service. **/
  serviceName?: string

  /** The homepage of your service. **/
  serviceUrl?: string

  /** Used to add navigation to the service header. **/
  navigation: Array<{
    /** If `true`, indicates that the user is currently on this page. This takes precedence over `active`. **/
    current?: boolean

    /** If `true`, indicates that the user is within this group of pages in the navigation hierarchy. **/
    active?: boolean

    /** HTML for the navigation item. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Text for the navigation item. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** URL of the navigation item anchor. **/
    href?: string

    /** HTML attributes (for example data attributes) to add to the navigation item anchor. **/
    attributes?: Record<string, unknown>
  }>

  /** Specified points for injecting custom HTML into the service header. **/
  slots?: {
    /** HTML injected at the start of the service header container. **/
    start?: string

    /** HTML injected at the end of the service header container. **/
    end?: string

    /** HTML injected before the first list item in the navigation list. Requires `navigation` to be set. **/
    navigationStart?: string

    /** HTML injected after the last list item in the navigation list. Requires `navigation` to be set. **/
    navigationEnd?: string
  }
}

export const GovUKServiceNavigation = GovUKServiceNavigationTemplate as FC<GovUKServiceNavigationProps>

import GovUKSkipLinkTemplate from "govuk-frontend/dist/govuk/components/skip-link/template.njk"

export interface GovUKSkipLinkProps {
  /** If `html` is set, this is not required. Text to use within the skip link component. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the skip link component. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** The value of the skip link’s `href` attribute. Defaults to `"#content"` if you do not provide a value. **/
  href?: string

  /** Classes to add to the skip link. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the skip link. **/
  attributes?: Record<string, unknown>
}

export const GovUKSkipLink = GovUKSkipLinkTemplate as FC<GovUKSkipLinkProps>

import GovUKSummaryListTemplate from "govuk-frontend/dist/govuk/components/summary-list/template.njk"

export interface GovUKSummaryListProps {
  /** The rows within the summary list component. **/
  rows: Array<{
    /** Classes to add to the row `div`. **/
    classes?: string

    /** The reference content (key) for each row item in the summary list component. **/
    key: {
      /** If `html` is set, this is not required. Text to use within each key. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** If `text` is set, this is not required. HTML to use within each key. If `html` is provided, the `text` option will be ignored. **/
      html: string

      /** Classes to add to the key wrapper. **/
      classes?: string
    }

    /** The value for each row item in the summary list component. **/
    value: {
      /** If `html` is set, this is not required. Text to use within each value. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** If `text` is set, this is not required. HTML to use within each value. If `html` is provided, the `text` option will be ignored. **/
      html: string

      /** Classes to add to the value wrapper. **/
      classes?: string
    }

    /** The action link content for each row item in the summary list component. **/
    actions?: {
      /** The action link items within the row item of the summary list component. **/
      items?: Array<{
        /** The value of the link's `href` attribute for an action item. **/
        href: string

        /** If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored. **/
        text: string

        /** If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored. **/
        html: string

        /** Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios. **/
        visuallyHiddenText?: string

        /** Classes to add to the action item. **/
        classes?: string

        /** HTML attributes (for example data attributes) to add to the action item. **/
        attributes?: Record<string, unknown>
      }>

      /** Classes to add to the actions wrapper. **/
      classes?: string
    }
  }>

  /** Can be used to wrap a summary card around the summary list component. If any of these options are present, a summary card will wrap around the summary list. **/
  card?: {
    /** Data for the summary card header. **/
    title?: {
      /** Text to use within each title. If `html` is provided, the `text` option will be ignored. **/
      text?: string

      /** Text to use within each title. If `html` is provided, the `text` option will be ignored. **/
      html?: string

      /** Heading level, from `1` to `6`. Default is `2`. **/
      headingLevel?: number

      /** Classes to add to the title wrapper. **/
      classes?: string
    }

    /** The action link content shown in the header of each summary card wrapped around the summary list component. **/
    actions?: {
      /** The action link items shown in the header within the summary card wrapped around the summary list component. **/
      items?: Array<{
        /** The value of the link's `href` attribute for an action item. **/
        href: string

        /** If `html` is set, this is not required. Text to use within each action item. If `html` is provided, the `text` option will be ignored. **/
        text: string

        /** If `text` is set, this is not required. HTML to use within each action item. If `html` is provided, the `text` option will be ignored. **/
        html: string

        /** Actions rely on context from the surrounding content so may require additional accessible text. Text supplied to this option is appended to the end. Use `html` for more complicated scenarios. **/
        visuallyHiddenText?: string

        /** Classes to add to the action item. **/
        classes?: string

        /** HTML attributes (for example data attributes) to add to the action item. **/
        attributes?: Record<string, unknown>
      }>

      /** Classes to add to the actions wrapper. **/
      classes?: string
    }

    /** Classes to add to the container. **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the container. **/
    attributes?: Record<string, unknown>
  }

  /** Classes to add to the container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the container. **/
  attributes?: Record<string, unknown>
}

export const GovUKSummaryList = GovUKSummaryListTemplate as FC<GovUKSummaryListProps>

import GovUKTableTemplate from "govuk-frontend/dist/govuk/components/table/template.njk"

export interface GovUKTableProps {
  /** The rows within the table component. **/
  rows: Array<{
    /** If `html` is set, this is not required. Text for cells in table rows. If `html` is provided, the `text` option will be ignored. **/
    text: string

    /** If `text` is set, this is not required. HTML for cells in table rows. If `html` is provided, the `text` option will be ignored. **/
    html: string

    /** Specify format of a cell. Currently we only use "numeric". **/
    format?: string

    /** Classes to add to the table row cell. **/
    classes?: string

    /** Specify how many columns a cell extends. **/
    colspan?: number

    /** Specify how many rows a cell extends. **/
    rowspan?: number

    /** HTML attributes (for example data attributes) to add to the table cell. **/
    attributes?: Record<string, unknown>
  }>

  /** Can be used to add a row of table header cells (`<th>`) at the top of the table component. **/
  head?: Array<{
    /** If `html` is set, this is not required. Text for table head cells. If `html` is provided, the `text` option will be ignored. **/
    text?: string

    /** If `text` is set, this is not required. HTML for table head cells. If `html` is provided, the `text` option will be ignored. **/
    html?: string

    /** Specify format of a cell. Currently we only use "numeric". **/
    format?: string

    /** Classes to add to the table head cell. **/
    classes?: string

    /** Specify how many columns a cell extends. **/
    colspan?: number

    /** Specify how many rows a cell extends. **/
    rowspan?: number

    /** HTML attributes (for example data attributes) to add to the table cell. **/
    attributes?: Record<string, unknown>
  }>

  /** Caption text. **/
  caption?: string

  /** Classes for caption text size. Classes should correspond to the available typography heading classes. **/
  captionClasses?: string

  /** If set to `true`, the first cell in each row will be a table header (`<th>`). **/
  firstCellIsHeader?: boolean

  /** Classes to add to the table container. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the table container. **/
  attributes?: Record<string, unknown>
}

export const GovUKTable = GovUKTableTemplate as FC<GovUKTableProps>

import GovUKTabsTemplate from "govuk-frontend/dist/govuk/components/tabs/template.njk"

export interface GovUKTabsProps {
  /** This is used for the main component and to compose the ID attribute for each item. **/
  id?: string

  /** Optional prefix. This is used to prefix the `id` attribute for each tab item and panel, separated by `-`. **/
  idPrefix?: string

  /** Title for the tabs table of contents. **/
  title?: string

  /** The individual tabs within the tabs component. **/
  items: Array<{
    /** Specific ID attribute for the tab item. If omitted, then `idPrefix` string is required instead. **/
    id: string

    /** The text label of a tab item. **/
    label: string

    /** HTML attributes (for example data attributes) to add to the tab. **/
    attributes?: Record<string, unknown>

    /** The contents of each tab within the tabs component. This is referenced as a panel. **/
    panel: {
      /** If `html` is set, this is not required. Text to use within each tab panel. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** If `text` is set, this is not required. HTML to use within each tab panel. If `html` is provided, the `text` option will be ignored. **/
      html: string

      /** HTML attributes (for example data attributes) to add to the tab panel. **/
      attributes?: Record<string, unknown>
    }
  }>

  /** Classes to add to the tabs component. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the tabs component. **/
  attributes?: Record<string, unknown>
}

export const GovUKTabs = GovUKTabsTemplate as FC<GovUKTabsProps>

import GovUKTagTemplate from "govuk-frontend/dist/govuk/components/tag/template.njk"

export interface GovUKTagProps {
  /** If `html` is set, this is not required. Text to use within the tag component. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the tag component. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** Classes to add to the tag. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the tag. **/
  attributes?: Record<string, unknown>
}

export const GovUKTag = GovUKTagTemplate as FC<GovUKTagProps>

import GovUKTaskListTemplate from "govuk-frontend/dist/govuk/components/task-list/template.njk"

export interface GovUKTaskListProps {
  /** The items for each task within the task list component. **/
  items: Array<{
    /** The main title for the task within the task list component. **/
    title: {
      /** Text to use within the title. If `html` is provided, the `text` argument will be ignored. **/
      text: string

      /** HTML to use within the title. If `html` is provided, the `text` argument will be ignored. **/
      html: string

      /** Classes to add to the title wrapper. **/
      classes?: string
    }

    /** Can be used to add a hint to each task within the task list component. **/
    hint?: {
      /** Text to use within the hint. If `html` is provided, the `text` argument will be ignored. **/
      text: string

      /** HTML to use within the hint. If `html` is provided, the `text` argument will be ignored. **/
      html: string
    }

    /** The status for each task within the task list component. **/
    status: {
      /** Can be used to add a tag to the status of the task within the task list component. **/
      tag?: Record<string, unknown>

      /** Text to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored. **/
      text?: string

      /** HTML to use for the status, as an alternative to using a tag. If `html` or `tag` is provided, the `text` argument will be ignored. **/
      html?: string

      /** Classes to add to the status container. **/
      classes?: string
    }

    /** The value of the link’s `href` attribute for the task list item. **/
    href?: string

    /** Classes to add to the item `div`. **/
    classes?: string
  }>

  /** Classes to add to the `ul` container for the task list. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the `ul` container for the task list. **/
  attributes?: Record<string, unknown>

  /** Optional prefix. This is used to prefix the `id` attribute for the task list item tag and hint, separated by `-`. Defaults to `"task-list"`. **/
  idPrefix?: string
}

export const GovUKTaskList = GovUKTaskListTemplate as FC<GovUKTaskListProps>

import GovUKTextareaTemplate from "govuk-frontend/dist/govuk/components/textarea/template.njk"

export interface GovUKTextareaProps {
  /** The ID of the textarea. Defaults to the value of `name`. **/
  id?: string

  /** The name of the textarea, which is submitted with the form data. **/
  name: string

  /** Optional field to enable or disable the `spellcheck` attribute on the textarea. **/
  spellcheck?: boolean

  /** Optional number of textarea rows (default is 5 rows). **/
  rows?: string

  /** Optional initial value of the textarea. **/
  value?: string

  /** If `true`, textarea will be disabled. **/
  disabled?: boolean

  /** One or more element IDs to add to the `aria-describedby` attribute, used to provide additional descriptive information for screenreader users. **/
  describedBy?: string

  /** The label used by the textarea component. **/
  label: Record<string, unknown>

  /** Can be used to add a hint to the textarea component. **/
  hint?: Record<string, unknown>

  /** Can be used to add an error message to the textarea component. The error message component will not display if you use a falsy value for `errorMessage`, for example `false` or `null`. **/
  errorMessage?: Record<string, unknown>

  /** Additional options for the form group containing the textarea component. **/
  formGroup?: {
    /** Classes to add to the form group (for example to show error state for the whole group). **/
    classes?: string

    /** HTML attributes (for example data attributes) to add to the form group. **/
    attributes?: Record<string, unknown>

    /** Content to add before the textarea used by the textarea component. **/
    beforeInput?: {
      /** Text to add before the textarea. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add before the textarea. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }

    /** Content to add after the textarea used by the textarea component. **/
    afterInput?: {
      /** Text to add after the textarea. If `html` is provided, the `text` option will be ignored. **/
      text: string

      /** HTML to add after the textarea. If `html` is provided, the `text` option will be ignored. **/
      html: string
    }
  }

  /** Classes to add to the textarea. **/
  classes?: string

  /** Attribute to meet [WCAG success criterion 1.3.5: Identify input purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html), for instance `"bday-day"`. See the [Autofill section in the HTML standard](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill) section in the HTML standard for full list of attributes that can be used. **/
  autocomplete?: string

  /** HTML attributes (for example data attributes) to add to the textarea. **/
  attributes?: Record<string, unknown>
}

export const GovUKTextarea = GovUKTextareaTemplate as FC<GovUKTextareaProps>

import GovUKWarningTextTemplate from "govuk-frontend/dist/govuk/components/warning-text/template.njk"

export interface GovUKWarningTextProps {
  /** If `html` is set, this is not required. Text to use within the warning text component. If `html` is provided, the `text` option will be ignored. **/
  text: string

  /** If `text` is set, this is not required. HTML to use within the warning text component. If `html` is provided, the `text` option will be ignored. **/
  html: string

  /** The fallback text for the icon. Defaults to `"Warning"`. **/
  iconFallbackText?: string

  /** Classes to add to the warning text. **/
  classes?: string

  /** HTML attributes (for example data attributes) to add to the warning text. **/
  attributes?: Record<string, unknown>
}

export const GovUKWarningText = GovUKWarningTextTemplate as FC<GovUKWarningTextProps>

