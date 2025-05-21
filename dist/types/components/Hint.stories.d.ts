import { StoryObj } from "@storybook/html";
import { Hint } from "./Hint";
type Story = StoryObj<typeof Hint>;
declare const _default: {
    component: import("@storybook/html").StoryFn<Partial<import("./Hint").HintProps>>;
};
export default _default;
export declare const Default: Story;
export declare const WithHtml: Story;
export declare const Classes: Story;
export declare const Id: Story;
export declare const HtmlAsText: Story;
export declare const Attributes: Story;
