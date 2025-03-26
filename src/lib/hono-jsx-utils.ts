import { html } from "hono/html"
import { Child, isValidElement, } from "hono/jsx"

export async function renderTextOrHtml(param: Exclude<Child, boolean | undefined | null>
): Promise<string>
export async function renderTextOrHtml(param: Child): Promise<string | undefined>
export async function renderTextOrHtml(param: Child): Promise<string | undefined> {
  if (typeof param === 'string' || typeof param === 'number' || typeof param === "bigint") {
    return html`${param}`
  }

  if (Array.isArray(param)) {
    const inner = await mapAsync(param, renderTextOrHtml)
    const html = inner.filter(Boolean) as string[]

    return html.join(' ')
  }

  if (isValidElement(param)) {
    return html`${param}`
  }
}

export async function honoTextOrHtmlToGovUK<Html extends string, Text extends string>(param: Child, params: { html: Html, text: Text }): Promise<Record<Html | Text, string>>
export async function honoTextOrHtmlToGovUK(param: Child): Promise<{ html: string, text: string }>
export async function honoTextOrHtmlToGovUK(param: Child, params = { html: 'html', text: 'text' }) {
  const html = await renderTextOrHtml(param)
  if (!html) return

  return { [params.html]: html }
}

export async function mapAsync<T, U>(xs: T[], fn: (x: T) => U | Promise<U>) {
  return Promise.all(xs.map(fn))
}
