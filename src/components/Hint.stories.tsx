import { Meta, StoryObj } from "@storybook/html";
import { Hint } from "./Hint";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Hint>;

export default {
  component: renderHtmlStory(Hint),
} satisfies Meta<typeof Hint>;

export const Default: Story = {
  args: {
    children:
      "It's on your National Insurance card, benefit letter, payslip or P60.\nFor example, 'QQ 12 34 56 C'.\n",
  },
};

export const WithHtml: Story = {
  args: {
    children: (
      <>
        It's on your National Insurance card, benefit letter, payslip or{" "}
        <a class="govuk-link" href="#">
          P60
        </a>
        . For example, 'QQ 12 34 56 C'
      </>
    ),
  },
};

export const Classes: Story = {
  args: {
    id: "example-hint",
    classes: "app-hint--custom-modifier",
    children:
      "It's on your National Insurance card, benefit letter, payslip or P60.",
  },
};

export const Id: Story = {
  args: {
    id: "my-hint",
    children:
      "It's on your National Insurance card, benefit letter, payslip or P60.",
  },
};

export const HtmlAsText: Story = {
  args: { children: "Unexpected <strong>bold text</strong> in body" },
};

export const Attributes: Story = {
  args: {
    children:
      "It's on your National Insurance card, benefit letter, payslip or P60.",
    attributes: { "data-attribute": "my data value" },
  },
};
