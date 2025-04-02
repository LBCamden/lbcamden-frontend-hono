# 🧪 lbcamden-frontend-hono

Hono/jsx build of the [LBCamden Frontend](https://github.com/LBCamden/lbcamden-frontend) library.

JSX components can be used server-side in [Hono](https://hono.dev/) projects. Their implementations are generated from upstream nunjucks templates (with minor api changes to improve ergonomics).

Typescript types are generated from upstream macro schemas.

> [!WARNING]  
> This is _experimental_. Expect missing components, potential bugs, inaccurate documentation and breaking changes.

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

## Page scaffolding and asset pipeline

The library also includes a base page template some helpers to assist with frontend asset bundling using vite, which can be slightly tricky to configure in Hono.

This part is optional, but if you don't do this, you'll need to ensure that the lbcamden-frontend css and js is available some other way.

Assuming that your deployment target is Cloudflare Pages, configure your project as follows:

### vite.config.ts

```typescript
import build from '@hono/vite-cloudflare-pages'
import { defineConfig } from 'lbcamden-frontend-hono-jsx/vite'
import adapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig({
  hono: {
    // Use this instead of configuring the Hono devServer plugin directly
    devServer: {
      adapter,
      // Entrypoint for your hono server
      entry: "src/index.tsx"
    },
    // Place the Hono build plugin here instead of in the plugins array directly
    build: build()
  },
  client: {
    // Root directory of client source files (css/scss/js/ts). All client sources must be in this directory.
    sourceDir: "./src/client",
    // Files placed in the sourceDir.
    entrypoints: ["client.js", "style.scss"]
  }
})
```

Add scss and js entrypoints.

### src/client/style.scss

```scss
@forward "lbcamden-frontend";

// Project-specific styling goes here...
```

### src/client/client.js

```javascript
import * as lbCamden from "lbcamden-frontend/dist/lbcamden-frontend-1.0.2.min.js";
import * as govUK from "govuk-frontend";

govUK.initAll();
lbCamden.initAll();

// Project-specific js goes here...
```

### src/components/layout.tsx

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
      isDev: import.meta.env.DEV,
    }}
    {...props}
  />
);
```

### Fonts and images

Ensure that static assets referenced by lbcamden-frontend are referenced from the project's public directory:

```bash
ln -s ../../node_modules/lbcamden-frontend/dist/assets public/assets
```

### Building for production

Update your package.json's build command to build the frontend bundle as well as the backend:

```json
"scripts": {
    "build": "vite build && vite build --mode client"
}
```
