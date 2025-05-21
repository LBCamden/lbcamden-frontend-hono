import { Child } from "hono/jsx";
/**
 * Render a jsx html fragment to a string.
 */
export declare function renderHtml(param: Exclude<Child, boolean | undefined | null>): Promise<string>;
export declare function renderHtml(param: Child): Promise<string | undefined>;
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
export declare function renderChildFragment<Html extends string, Text extends string>(param: Child, params: {
    html: Html;
    text: Text;
}): Promise<Record<Html | Text, string>>;
export declare function renderChildFragment(param: Child): Promise<{
    html: string;
    text: string;
}>;
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
export declare function normaliseContentObject<T extends ContentObject>(item: Child | T): Promise<NormalisedContent<T>>;
type ContentObject = {
    content?: Child;
};
type NormalisedContent<T extends ContentObject> = Partial<Omit<T, 'content'>> & {
    html: string;
    text: string;
};
/**
 * Helper for mapping over an array asynchronously.
 */
export declare function mapAsync<T, U>(xs: T[], fn: (x: T) => U | Promise<U>): Promise<(Awaited<U> | Awaited<U>)[]>;
export declare function isJsxChild(x: unknown): x is Child;
export {};
