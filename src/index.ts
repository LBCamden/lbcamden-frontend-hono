import "hono"

export * from './layout/Page'
export * from './components'
export * from './utils/asset-paths'

export interface RenderContext {
  title?: string
  metaDescription?: string
}

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: RenderContext): Response;
  }
}
