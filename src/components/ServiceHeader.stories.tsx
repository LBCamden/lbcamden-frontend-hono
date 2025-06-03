import { Meta, StoryObj } from "@storybook/html";
import { ServiceHeader, ServiceHeaderProps } from "./ServiceHeader";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<ServiceHeaderProps>;

export default {
  component: renderHtmlStory(ServiceHeader),
} satisfies Meta<typeof ServiceHeader>;

export const Default: Story = {
  args: {
    productName: "Report a wobbly tooth",
  },
};
