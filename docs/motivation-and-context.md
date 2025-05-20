# Motivation & Context

This library sits downstream of the following libraries:

- lbcamden-frontend
- govuk-frontend

Most of its 'heavy lifting' is done by `vite-plugin-nunjucks-loader`, a Vite plugin that bundles nunjucks templates into a javascript bundle so that they can be used in serverless and browser environments.

This library exists to allow the upstream libraries to be used easily by transactional frontends built using Hono/jsx. Before working on it, it's important to understand why the library is needed, why we don't just use the downstream libraries and build tooling directly in projects and why some manual work is needed when exposing components from the upstream libraries:

## 1. Removing build dependencies

Nunjucks templates usually require the full NodeJS API and filesystem access. This is not available in serverless environments like cloudflare workers.

Nunjucks supports environments like this by providing the ability to pre-compile its templates into javascript. A compiled template is a function from parameters to an output html string. A template compiled by `vite-plugin-nunjucks-loader` can be used like this:

```typescript
import backLink from 'back-link.njk'

const html: string = backLink({
  params: {
    text: "Back to home"
  }
})
```

However this requires an additional build step. We don't want to impose that requirement on all downstream projects.

## 2. Wrapping templates in a JSX component

Hono's server-side jsx components map very closely onto Nunjucks templates - both are functions from parameters to an output html string. So, given our compiled Nunjucks template from step 1, we can quite easily wrap our template function in.

The slight complication here is that we need to tell Hono to interpret the html output from Nunjucks as raw html rather than text content that may need escaping. We probably also want to treat the props object passed into the component as the `params` variable that our templates conventionally use to receive parameters.

```tsx
import backLink from 'back-link.njk'
import { raw } from "hono/html";

/// Usage: <BackLink text="Hello" />
export function BackLink(params) {
  return raw(backLink({ params }))
}

```

## 3. Developer ergonomics and XSS protection

This works well enough for some components, but it doesn't work so nicely when we need to model parent-child relationships:

```tsx
<PhaseBanner tag={{ text: "Alpha" }} html='This is a new service - your <a href="#" class="govuk-link">feedback</a> will help us to improve it.' />
```

Really, we'd like to do something like this:

```tsx
<PhaseBanner tag="Alpha">
  This is a new service - your <a href="#" class="govuk-link">feedback</a> will help us to improve it.
</PhaseBanner>
```

Conventionally, when the govuk/lbcamden frontend libraries accept child html, they do one of 3 things:

1. When it is the main content of the component, there is a top-level `text` or `html` parameter that will be treated as plain text or raw html respectively.
2. The component has a parameter that is an object containing either a `text` or `html` property.
3. The component has parameters with suffixed names like `headingText` and `headingHtml`

We can express each of these in our component API as follows:

1. Our jsx component exposes a `children` prop. If it receives JSX, that is rendered and passed to the template via the `html` param. If it receives a string, it is passed straight into the `text` param.
2. Our component exposes a prop with the same name as the template parameter. It accepts either plain text or JSX, which is rendered if needed and passed into the template as an object with either a `text` or `html` property.
3. Our component has a property named by the stem of the suffixed parameter (eg: `heading`). It rendered if needed and passed into the appropriate suffixed template parameter.

Supporting this means that our wrapper templates need to be a little bit more involved. We want to pass most of the props the component receives straight into the nunjucks templates, but for some will need to be split out and converted as needed.

This library includes the `honoTextOrHtmlToGovUK` utility, which handles most of this for us. Refer to its inline documentation for how to use it.

This isn't just question of developer ergonomics - when a raw html string is passed into a template, we're trusting that it doesn't contain unvalidated user inputs. By accepting hono jsx, we can use hono's inbuilt xss protection to prevent accidentally passing unsafe values into nunjucks templates.