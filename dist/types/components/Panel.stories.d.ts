import { StoryObj } from "@storybook/html";
import { Panel } from "./Panel";
type Story = StoryObj<typeof Panel>;
declare const _default: {
    component: import("@storybook/html").StoryFn<Partial<import("./Panel").PanelProps>>;
};
export default _default;
export declare const Default: Story;
export declare const CustomHeadingLevel: Story;
export declare const TitleHtmlAsText: Story;
export declare const TitleHtml: Story;
export declare const BodyHtmlAsText: Story;
export declare const BodyHtml: Story;
export declare const Classes: Story;
export declare const Attributes: Story;
export declare const TitleWithNoBodyText: Story;
