import { StoryFn } from "@storybook/html";
import { FC } from "hono/jsx";

// @ts-ignore
import * as LBCamden from "lbcamden-frontend";

// @ts-ignore
import * as GovUK from "govuk-frontend";

export function renderHtmlStory<Params>(
  Component: FC<Params>,
): StoryFn<Partial<Params>> {
  return (args) => {
    const el = document.createElement("div");

    const rendered = <Component {...(args as any)} />;

    Promise.resolve(rendered.toString()).then((res) => {
      el.innerHTML = res;
      GovUK.initAll({ scope: el });
      LBCamden.initAll({ scope: el });
    });

    return el;
  };
}
