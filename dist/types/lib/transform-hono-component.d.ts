type TemplateFn = (args: any) => Promise<string>;
export default function decorateJsTemplate(templateFn: TemplateFn): (params: any) => Promise<import("hono/utils/html").HtmlEscapedString>;
export {};
