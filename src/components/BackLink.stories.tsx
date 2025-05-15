import { Meta, StoryObj } from "@storybook/html";
import { BackLink, BackLinkProps } from "./BackLink";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<BackLinkProps>;

export default {
  component: renderHtmlStory(BackLink),
} satisfies Meta<BackLinkProps>;

export const Default: Story = { args: {} };

export const WithCustomText: Story = { args: { children: "Back to home" } };

export const WithCustomLink: Story = {
  args: { href: "/home", children: "Back to home" },
};

export const Inverse: Story = { args: { classes: "govuk-back-link--inverse" } };

export const Classes: Story = {
  args: { classes: "app-back-link--custom-class" },
};

export const HtmlAsText: Story = { args: { children: <b>Home</b> } };

export const Html: Story = { args: { children: <b>Back</b> } };

export const Attributes: Story = {
  args: {
    attributes: { "data-test": "attribute", "aria-label": "Back to home" },
  },
};
