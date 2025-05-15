import { Meta, StoryObj } from "@storybook/html";
import { Label } from "./Label";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Label>;

export default {
  component: renderHtmlStory(Label),
} satisfies Meta<typeof Label>;

export const Default: Story = {
  args: { children: "National Insurance number" },
};

export const WithBoldText: Story = {
  args: { classes: "govuk-label--s", children: "National Insurance number" },
};

export const StyledAsXlText: Story = {
  args: { children: "National Insurance number", classes: "govuk-label--xl" },
};

export const StyledAsLargeText: Story = {
  args: { children: "National Insurance number", classes: "govuk-label--l" },
};

export const StyledAsMediumText: Story = {
  args: { children: "National Insurance number", classes: "govuk-label--m" },
};

export const StyledAsSmallText: Story = {
  args: { children: "National Insurance number", classes: "govuk-label--s" },
};

export const AsPageHeadingXl: Story = {
  args: {
    children: "National Insurance number",
    classes: "govuk-label--xl",
    isPageHeading: true,
  },
};

export const AsPageHeadingL: Story = {
  args: {
    children: "National Insurance number",
    classes: "govuk-label--l",
    isPageHeading: true,
  },
};

export const AsPageHeadingM: Story = {
  args: {
    children: "National Insurance number",
    classes: "govuk-label--m",
    isPageHeading: true,
  },
};

export const AsPageHeadingS: Story = {
  args: {
    children: "National Insurance number",
    classes: "govuk-label--s",
    isPageHeading: true,
  },
};

export const AsPageHeadingWithoutClass: Story = {
  args: { children: "National Insurance number", isPageHeading: true },
};

export const Empty: Story = { args: {} };

export const Classes: Story = {
  args: {
    children: "National Insurance number",
    classes: "extra-class one-more-class",
  },
};

export const HtmlAsText: Story = {
  args: { children: "National Insurance number, <em>NINO</em>" },
};

export const Html: Story = {
  args: { children: "National Insurance number <em>NINO</em>" },
};

export const For: Story = {
  args: { for: "test-target-element", children: "National Insurance number" },
};

export const Attributes: Story = {
  args: {
    children: "National Insurance number",
    attributes: { "first-attribute": "foo", "second-attribute": "bar" },
  },
};
