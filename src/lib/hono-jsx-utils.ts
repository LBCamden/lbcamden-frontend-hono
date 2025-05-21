import { html } from "hono/html"
import { Child, isValidElement, } from "hono/jsx"

/**
 * Render a jsx html fragment to a string.
 */
export async function renderHtml(param: Exclude<Child, boolean | undefined | null>
): Promise<string>
export async function renderHtml(param: Child): Promise<string | undefined>
export async function renderHtml(param: Child): Promise<string | undefined> {
  if (typeof param === 'string' || typeof param === 'number' || typeof param === "bigint") {
    return html`${param}`
  }

  if (Array.isArray(param)) {
    const inner = await mapAsync(param, renderHtml)
    const html = inner.filter(Boolean) as string[]

    return html.join(' ')
  }

  if (isValidElement(param)) {
    return html`${param}`
  }
}

/**
 * Utility for converting between jsx children and the child html/text objects expected by upstream frontend lib.
 * 
 * Examples:
 * 
 * ```tsx
 * console.log(await renderChildFragment(<span>Hello</span>))
 * // { html: "<span>Hello</span>" }
 * 
 * console.log(await renderChildFragment("Hello"))
 * // { text: "<span>Hello</span>" }
 * 
 * console.log(await renderChildFragment(<span>Hello</span>, { html: "headingHtml", text: "headingText" }))
 * // { headingHtml: "<span>Hello</span>" }
 * 
 * console.log(await renderChildFragment("Hello", { html: "headingHtml", text: "headingText" }))
 * // { headingText: "Hello" }
 * ```
 */
export async function renderChildFragment<Html extends string, Text extends string>(param: Child, params: { html: Html, text: Text }): Promise<Record<Html | Text, string>>
export async function renderChildFragment(param: Child): Promise<{ html: string, text: string }>
export async function renderChildFragment(param: Child, params = { html: 'html', text: 'text' }) {
  if (!param) return

  if (typeof param === 'string' || typeof param === 'number') {
    return { [params.text]: String(param) }
  }

  const html = await renderHtml(param)
  if (!html) return

  return { [params.html]: html }
}

/**
 * Utility for converting between embedded objects that potentially contain jsx fragments and the child html/text objects expected by upstream frontend lib.
 * 
 * This variant is useful for cases where you have nested configuration objects that can be expressed in shorthand as a jsx fragment, such as:
 * 
 * ```tsx
 * <MyComponent heading={{ content: <span>Hello</span> }} />
 * <MyComponent heading={<span>Hello</span>} />
 * ```
 * 
 * These properties can be converted into a form suitable for upstream components as follows:
 * 
 * ```tsx
 * console.log(await normaliseContentObject(<span>Hello</span>))
 * // { html: "<span>Hello</span>" }
 * 
 * console.log(await normaliseContentObject{ content: <span>Hello</span>, classes: "my-custom-class" }))
 * // { html: "<span>Hello</span>", classes: "my-custom-class" }
 * 
 * console.log(await normaliseContentObject("Hello"))
 * // { text: "Hello" }
 * ```
 */

export async function normaliseContentObject<T extends ContentObject>(item: Child | T): Promise<NormalisedContent<T>> {
  if (isJsxChild(item)) {
    return await renderChildFragment(item) as NormalisedContent<T>
  }

  const { content, ...rest } = item

  return {
    ...rest,
    ...await renderChildFragment(content)
  }
}

type ContentObject = { content?: Child }
type NormalisedContent<T extends ContentObject> = Partial<Omit<T, 'content'>> & { html: string, text: string }


/**
 * Helper for mapping over an array asynchronously.
 */
export async function mapAsync<T, U>(xs: T[], fn: (x: T) => U | Promise<U>) {
  return Promise.all(xs.map(fn))
}

export function isJsxChild(x: unknown): x is Child {
  return typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean' || !x || (Array.isArray(x) && x.every(isJsxChild)) || isPromise(x) || isValidElement(x)
}

function isPromise(object: any): object is Promise<unknown> {
  return "then" in object && typeof object.then === 'function'
}
