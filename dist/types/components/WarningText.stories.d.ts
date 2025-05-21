import { StoryObj } from "@storybook/html";
import { WarningText } from "./WarningText";
type Story = StoryObj<typeof WarningText>;
declare const _default: {
    component: import("@storybook/html").StoryFn<Partial<import("./WarningText").WarningTextProps>>;
};
export default _default;
export declare const Default: Story;
export declare const MultipleLines: Story;
export declare const Attributes: Story;
export declare const Classes: Story;
export declare const Html: Story;
export declare const HtmlAsText: Story;
export declare const IconFallbackTextOnly: Story;
export declare const NoIconFallbackText: Story;
