import { defineConfig, UserConfig } from "vite";
import devServer, { defaultOptions, DevServerOptions } from '@hono/vite-dev-server'
import { basename, extname, join } from "path";

interface ConfigWithFrontendOpts extends UserConfig {
  hono: {
    devServer: DevServerOptions
    build: any,
  },
  client: UserConfig & {
    /** Path of directory containing client sources. All client code (excluding node_modules must live here) */
    sourceDir: string

    /** Entrypoint files (relative to sourceDir) for client-side code (typically js/ts and css/scss) */
    entrypoints: string[],
  }
}

export function defineConfigWithFrontendBuild({ plugins = [], hono, client, ...conf }: ConfigWithFrontendOpts) {
  return defineConfig((opts) => {
    const { sourceDir, entrypoints, ...clientConf } = client

    if (opts.mode === "client") {
      return {
        ...clientConf,
        build: {
          ...clientConf.build,
          rollupOptions: {
            ...clientConf.build?.rollupOptions,
            input: Object.fromEntries(
              client.entrypoints.map(ep => [
                basename(ep, extname(ep)),
                join(sourceDir, ep)
              ])
            ),
            output: {
              dir: './dist/static',
            }
          },
          copyPublicDir: false,
        }
      }
    }

    const sourcePath = '/' + client.sourceDir.replace(/^\./, '')

    const viteConf = {
      plugins: [
        ...plugins,
        hono.build,
        devServer({
          ...hono.devServer,
          exclude: [sourcePath + '/**', ...defaultOptions.exclude, ...hono.devServer.exclude ?? []]
        })
      ]
    }

    return viteConf
  })
}