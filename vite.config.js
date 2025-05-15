import { defineConfig } from "vite";
import nunjucksLoader from "vite-plugin-nunjucks-loader";

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    nunjucksLoader({
      templates: [
        "node_modules/lbcamden-frontend/lbcamden",
        "node_modules/govuk-frontend/dist",
        "src/layout",
      ],
      decorators: ["./src/lib/transform-hono-component.tsx"],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: "legacy",
      },
    },
  },

  build: {
    lib: {
      entry: {
        vite: "./src/vite.ts",
        index: "./src/index.ts",
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vite",
        "@hono/vite-dev-server",
        "hono/html",
        "hono/jsx",
        "path",
      ],
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
