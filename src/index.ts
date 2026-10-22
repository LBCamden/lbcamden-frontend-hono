import "hono"
import { Env } from "hono"

export * from './layout/Page'
export * from './components'
export * from './generic'

export interface RenderContext {
  title?: string
  metaDescription?: string
}

declare global {
    interface HonoEnv extends Env {
    }
}

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props?: RenderContext): Response | Promise<Response>;
  }
}
