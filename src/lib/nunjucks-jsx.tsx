import { raw } from "hono/html";

type TemplateFn = (args: any) => Promise<string>;

/**
 * Wraps a nunjucks template as a Hono component.
 *
 * Marks the output of the nunjucks render as html-safe so that hono will treat it as plain jsx.
 */
export default function nunjucksComponent(templateFn: TemplateFn) {
  return async (params: any) => {
    return <>{raw(await templateFn({ params }))}</>;
  };
}
