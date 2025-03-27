import { defineConfig as d } from "vite";
import c, { defaultOptions as l } from "@hono/vite-dev-server";
import { basename as p, join as m, extname as a } from "path";
function y({ plugins: o = [], hono: e, client: i, ...v }) {
  return d((u) => {
    var n;
    const { sourceDir: f, entrypoints: b, ...r } = i;
    if (u.mode === "client")
      return {
        ...r,
        build: {
          ...r.build,
          rollupOptions: {
            ...(n = r.build) == null ? void 0 : n.rollupOptions,
            input: Object.fromEntries(
              i.entrypoints.map((t) => [
                p(t, a(t)),
                m(f, t)
              ])
            ),
            output: {
              dir: "./dist/static"
            }
          },
          copyPublicDir: !1
        }
      };
    const s = "/" + i.sourceDir.replace(/^\./, "");
    return {
      plugins: [
        ...o,
        e.build,
        c({
          ...e.devServer,
          exclude: [s + "/**", ...l.exclude, ...e.devServer.exclude ?? []]
        })
      ]
    };
  });
}
export {
  y as defineConfig
};
