import { Meta, StoryObj } from "@storybook/html";
import { WarningText } from "./WarningText";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof WarningText>;

export default {
  component: renderHtmlStory(WarningText),
} satisfies Meta<typeof WarningText>;

export const Default: Story = {
  args: {
    children: "You can be fined up to £5,000 if you don’t register.",
    iconFallback: "Warning",
  },
};

export const MultipleLines: Story = {
  args: {
    children:
      "If you are not covered by this License), You must: (a) comply with the terms stated above for the purpose of this license. It explains, for example, the production of a Source form, including but not limited to, the implied warranties or conditions of this License, without any additional file created by such Respondent to you under Sections 2.1 and 2.2 above. Larger Works. You may choose to distribute such a notice and a brief idea of what it does.",
    iconFallback: "Warning",
  },
};

export const Attributes: Story = {
  args: {
    children: "You can be fined up to £5,000 if you don’t register.",
    attributes: { id: "my-warning-text", "data-test": "attribute" },
  },
};

export const Classes: Story = {
  args: {
    children: "Warning text",
    classes: "govuk-warning-text--custom-class",
  },
};

export const Html: Story = {
  args: { children: <span>Some custom warning text</span> },
};

export const HtmlAsText: Story = {
  args: { children: "<span>Some custom warning text</span>" },
};

export const IconFallbackTextOnly: Story = {
  args: { iconFallback: "Some custom fallback text" },
};

export const NoIconFallbackText: Story = {
  args: { children: "This is a warning" },
};
