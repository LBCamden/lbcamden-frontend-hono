import { Child } from "hono/jsx"

export type EmbeddedContent<T> = Omit<T, "html" | "text"> & {
  content?: Child
}

export type HasEmbeddedContentArray<T> = {
  [P in keyof T]: EmbeddedContent<T[P]>
}