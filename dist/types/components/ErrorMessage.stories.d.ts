import { StoryObj } from "@storybook/html";
import { ErrorMessage } from "./ErrorMessage";
type Story = StoryObj<typeof ErrorMessage>;
declare const _default: {
    component: import("@storybook/html").StoryFn<Partial<import("./ErrorMessage").ErrorMessageProps>>;
};
export default _default;
export declare const Default: Story;
export declare const Translated: Story;
export declare const Id: Story;
export declare const Classes: Story;
export declare const HtmlAsText: Story;
export declare const Html: Story;
export declare const Attributes: Story;
export declare const WithVisuallyHiddenText: Story;
export declare const VisuallyHiddenTextRemoved: Story;
