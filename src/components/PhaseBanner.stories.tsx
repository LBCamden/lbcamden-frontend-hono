import { Meta, StoryObj } from "@storybook/html";
import { PhaseBanner } from "./PhaseBanner";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof PhaseBanner>;

export default {
  component: renderHtmlStory(PhaseBanner),
} satisfies Meta<typeof PhaseBanner>;

export const Default: Story = {
  args: {
    tag: "Alpha",
    children: (
      <>
        This is a new service - your{" "}
        <a href="#" class="govuk-link">
          feedback
        </a>{" "}
        will help us to improve it.
      </>
    ),
  },
};

export const Classes: Story = {
  args: {
    children:
      "This is a new service – your feedback will help us to improve it",
    classes: "extra-class one-more-class",
  },
};

export const Text: Story = {
  args: {
    children:
      "This is a new service – your feedback will help us to improve it",
  },
};

export const HtmlAsText: Story = {
  args: {
    children: (
      <>
        This is a new service - your{" "}
        <a href="#" class="govuk-link">
          feedback
        </a>{" "}
        will help us to improve it.
      </>
    ),
  },
};

export const Attributes: Story = {
  args: {
    children:
      "This is a new service – your feedback will help us to improve it",
    attributes: { "first-attribute": "foo", "second-attribute": "bar" },
  },
};

export const TagHtml: Story = {
  args: {
    children:
      "This is a new service – your feedback will help us to improve it",
    tag: <em>Alpha</em>,
  },
};

export const TagClasses: Story = {
  args: {
    children:
      "This is a new service – your feedback will help us to improve it",
    tag: { classes: "govuk-tag--grey", children: "Alpha" },
  },
};
