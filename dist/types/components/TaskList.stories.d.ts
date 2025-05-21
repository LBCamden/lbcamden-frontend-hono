import { StoryObj } from "@storybook/html";
import { TaskList } from "./TaskList";
type Story = StoryObj<typeof TaskList>;
declare const _default: {
    component: import("@storybook/html").StoryFn<Partial<import("./TaskList").TaskListProps>>;
};
export default _default;
export declare const Default: Story;
export declare const ExampleWith3States: Story;
export declare const ExampleWithHintTextAndAdditionalStates: Story;
export declare const ExampleWithAllPossibleColours: Story;
export declare const ExampleWithVeryLongSingleWordTags: Story;
export declare const CustomClasses: Story;
export declare const CustomAttributes: Story;
export declare const CustomIdPrefix: Story;
export declare const HtmlPassedAsText: Story;
export declare const Html: Story;
export declare const WithEmptyValues: Story;
