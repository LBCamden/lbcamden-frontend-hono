import { StoryFn } from "@storybook/html";
import { FC } from "hono/jsx";
export declare function renderHtmlStory<Params>(Component: FC<Params>): StoryFn<Partial<Params>>;
