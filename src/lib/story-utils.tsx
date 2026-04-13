import { StoryFn } from "@storybook/html";
import { FC } from "hono/jsx";

// @ts-ignore
import * as LBCamden from "lbcamden-frontend/dist/lbcamden-frontend-1.0.7.min.js";

export function renderHtmlStory<Params>(
  Component: FC<Params>,
): StoryFn<Partial<Params>> {
  return (args) => {
    const el = document.createElement("div");

    const rendered = <Component {...(args as any)} />;

    Promise.resolve(rendered.toString()).then((res) => {
      el.innerHTML = res;
      LBCamden.initAll({ scope: el });
    });

    return el;
  };
}
