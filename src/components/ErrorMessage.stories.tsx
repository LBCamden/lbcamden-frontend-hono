import { Meta, StoryObj } from "@storybook/html";
import { ErrorMessage } from "./ErrorMessage";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof ErrorMessage>;

export default {
  component: renderHtmlStory(ErrorMessage),
} satisfies Meta<typeof ErrorMessage>;

export const Default: Story = {
  args: { children: "Error message about full name goes here" },
};

export const Translated: Story = {
  args: {
    visuallyHidden: "",
    children: (
      <>
        <span class="govuk-visually-hidden">Gwall:</span> Neges gwall am yr enw
        llawn yn mynd yma
      </>
    ),
  },
};

export const Id: Story = {
  args: { id: "my-error-message-id", children: "This is an error message" },
};

export const Classes: Story = {
  args: { classes: "custom-class", children: "This is an error message" },
};

export const HtmlAsText: Story = { args: { children: "Unexpected > in body" } };

export const Html: Story = {
  args: {
    children: (
      <>
        Unexpected <b>bold text</b> in body copy
      </>
    ),
  },
};

export const Attributes: Story = {
  args: {
    children: "This is an error message",
    attributes: { "data-test": "attribute", id: "my-error-message" },
  },
};

export const WithVisuallyHiddenText: Story = {
  args: { children: "Rhowch eich enw llawn", visuallyHidden: "Gwall" },
};

export const VisuallyHiddenTextRemoved: Story = {
  args: { children: "There is an error on line 42", visuallyHidden: "" },
};
