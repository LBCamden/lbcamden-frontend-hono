import { Meta, StoryObj } from "@storybook/html";
import { InsetText } from "./InsetText";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof InsetText>;

export default {
  component: renderHtmlStory(InsetText),
} satisfies Meta<typeof InsetText>;

export const Default: Story = {
  args: {
    children:
      "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  },
};

export const WithHtml: Story = {
  args: {
    children: (
      <>
        <p class="govuk-body">
          It can take up to 8 weeks to register a lasting power of attorney if
          there are no mistakes in the application.
        </p>
        <div class="govuk-warning-text">
          <span class="govuk-warning-text__icon" aria-hidden="true">
            !
          </span>
          <strong class="govuk-warning-text__text">
            <span class="govuk-warning-text__assistive">Warning</span>
            You can be fined up to £5,000 if you don’t register.
          </strong>
        </div>
        <p class="govuk-body">
          It can take up to 8 weeks to register a lasting power of attorney if
          there are no mistakes in the application.
        </p>
      </>
    ),
  },
};

export const Classes: Story = {
  args: {
    classes: "app-inset-text--custom-modifier",
    children:
      "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  },
};

export const Id: Story = {
  args: {
    id: "my-inset-text",
    children:
      "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
  },
};

export const HtmlAsText: Story = {
  args: {
    children:
      "It can take <b>up to 8 weeks</b> to register a lasting power of attorney if there are no mistakes in the application.",
  },
};

export const Attributes: Story = {
  args: {
    children:
      "It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.",
    attributes: { "data-attribute": "my data value" },
  },
};
