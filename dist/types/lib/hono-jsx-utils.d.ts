import { Child } from "hono/jsx";
export declare function renderTextOrHtml(param: Exclude<Child, boolean | undefined | null>): Promise<string>;
export declare function renderTextOrHtml(param: Child): Promise<string | undefined>;
export declare function honoTextOrHtmlToGovUK<Html extends string, Text extends string>(param: Child, params: {
    html: Html;
    text: Text;
}): Promise<Record<Html | Text, string>>;
export declare function honoTextOrHtmlToGovUK(param: Child): Promise<{
    html: string;
    text: string;
}>;
export declare function mapAsync<T, U>(xs: T[], fn: (x: T) => U | Promise<U>): Promise<(Awaited<U> | Awaited<U>)[]>;
