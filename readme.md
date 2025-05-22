# 🧪 lbcamden-frontend-hono

Hono/jsx build of the [LBCamden Frontend](https://github.com/LBCamden/lbcamden-frontend) library.

JSX components can be used server-side in [Hono](https://hono.dev/) projects. Their implementations are generated from upstream nunjucks templates (with minor api changes to improve ergonomics).

Typescript types are generated from upstream macro schemas.

> [!WARNING]  
> This is _experimental_. Expect missing components, potential bugs, inaccurate documentation and breaking changes.

See also:

- [Developer Workflow](/docs/development-workflow.md)
- [Motivation and Context](/docs/motivation-and-context.md)

## Getting started

This library depends on hono, lbcamden-frontend v1 and govuk-frontend v5.

```bash
npm install github:lbcamden/lbcamden-frontend-hono lbcamden-frontend govuk-frontend
```

Import components into your project and use them.

```typescript
import { Input } from 'lbcamden-frontend-hono'

export default MyComponent() {
  return <Input name="ni-number" label="National insurance number" />
}
```

## Page layout and asset pipeline

Use the `<Page />` component to create a basic page layout with header and footer.

```typescript
import { FC } from "hono/jsx";
import { Page } from "lbcamden-frontend-hono";

/**
 * Scaffolds a Camden-branded page template with correctly imported frontend js and styling.
 * 
 * Wrap all pages in this component.
 **/
export const Layout: FC = ({ ...props }) => (
  <Page
    assetConf={{
      devAssetPath: "/src/client",
      prodAssetPath: "/assets",
      jsMain: "client.js",
      styleMain: "style.scss",
    }}
    {...props}
  />
);
```
