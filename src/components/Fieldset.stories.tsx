import { Meta, StoryObj } from "@storybook/html";
import { Fieldset, FieldsetProps } from "./Fieldset";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<FieldsetProps>;

export default {
  component: renderHtmlStory(Fieldset),
} satisfies Meta<FieldsetProps>;

export const Default: Story = { args: { legend: "What is your address?" } };

export const StyledAsXlText: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--xl",
    },
  },
};

export const StyledAsLargeText: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--l",
    },
  },
};

export const StyledAsMediumText: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--m",
    },
  },
};

export const StyledAsSmallText: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--s",
    },
  },
};

export const AsPageHeadingXl: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--xl",
      isPageHeading: true,
    },
  },
};

export const AsPageHeadingL: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--l",
      isPageHeading: true,
    },
  },
};

export const AsPageHeadingM: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--m",
      isPageHeading: true,
    },
  },
};

export const AsPageHeadingS: Story = {
  args: {
    legend: {
      content: "What is your address?",
      classes: "govuk-fieldset__legend--s",
      isPageHeading: true,
    },
  },
};

export const AsPageHeadingWithoutClass: Story = {
  args: { legend: { content: "What is your address?", isPageHeading: true } },
};

export const HtmlFieldsetContent: Story = {
  args: {
    legend: "What is your address?",
    children: (
      <div class="my-content">
        <p>This is some content to put inside the fieldset</p>
      </div>
    ),
  },
};

export const WithDescribedBy: Story = {
  args: { describedBy: "test-target-element", legend: "Which option?" },
};

export const HtmlAsText: Story = {
  args: { legend: "What is <b>your</b> address?" },
};

export const Html: Story = {
  args: {
    legend: (
      <>
        What is <b>your</b> address?
      </>
    ),
  },
};

export const LegendClasses: Story = {
  args: {
    legend: { content: "What is your address?", classes: "my-custom-class" },
  },
};

export const Classes: Story = {
  args: { classes: "app-fieldset--custom-modifier", legend: "Which option?" },
};

export const Role: Story = { args: { role: "group", legend: "Which option?" } };

export const Attributes: Story = {
  args: { attributes: { "data-attribute": "value" }, legend: "Which option?" },
};
