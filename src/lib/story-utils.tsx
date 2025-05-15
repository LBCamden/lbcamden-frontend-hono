import { StoryFn } from "@storybook/html";
import { FC } from "hono/jsx";

// @ts-ignore
import * as GovUK from "lbcamden-frontend/dist/govuk-frontend.min.js";

export function renderHtmlStory<Params>(
  Component: FC<Params>
): StoryFn<Partial<Params>> {
  return (args) => {
    const el = document.createElement("div");

    const rendered = <Component {...args} />;

    Promise.resolve(rendered.toString()).then((res) => {
      el.innerHTML = res;
      GovUK.initAll({ scope: el });
    });

    return el;
  };
}
