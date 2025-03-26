import { raw } from "hono/html";

type TemplateFn = (args: any) => Promise<string>;

export default function decorateJsTemplate(templateFn: TemplateFn) {
  return async (params: any) => {
    return <>{raw(await templateFn({ params }))}</>;
  };
}
