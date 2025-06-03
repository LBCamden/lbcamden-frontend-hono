import { Child } from "hono/jsx"

export type EmbeddedContent<T> = Omit<NonNullable<T>, "html" | "text"> & {
  content?: Child
}

export type HasEmbeddedContentArray<T> = {
  [P in keyof T]: EmbeddedContent<T[P]>
}
