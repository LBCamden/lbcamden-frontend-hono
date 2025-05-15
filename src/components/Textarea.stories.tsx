import { Meta, StoryObj } from "@storybook/html";
import { Textarea } from "./Textarea";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Textarea>;

export default {
  component: renderHtmlStory(Textarea),
} satisfies Meta<typeof Textarea>;

export const Default: Story = {
  args: { name: "more-detail", label: "Can you provide more detail?" },
};

export const WithHint: Story = {
  args: {
    name: "more-detail",
    id: "more-detail",
    label: "Can you provide more detail?",
    hint: "Don't include personal or financial information, eg your National Insurance number or credit card details.",
  },
};

export const WithErrorMessage: Story = {
  args: {
    name: "no-ni-reason",
    id: "no-ni-reason",
    label: "Why can’t you provide a National Insurance number?",
    errorMessage: "You must provide an explanation",
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: "full-address",
    name: "address",
    value: "221B Baker Street\nLondon\nNW1 6XE\n",
    label: "Full address",
  },
};

export const WithCustomRows: Story = {
  args: { id: "full-address", name: "address", label: "Full address", rows: 8 },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    id: "textarea-with-page-heading",
    name: "address",
    label: {
      children: "Full address",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
  },
};

export const WithOptionalFormGroupClasses: Story = {
  args: {
    id: "textarea-with-page-heading",
    name: "address",
    label: "Full address",
    formGroup: { classes: "extra-class" },
  },
};

export const WithAutocompleteAttribute: Story = {
  args: {
    id: "textarea-with-autocomplete-attribute",
    name: "address",
    label: "Full address",
    autocomplete: "street-address",
  },
};

export const WithSpellcheckEnabled: Story = {
  args: {
    label: "Spellcheck is enabled",
    id: "textarea-with-spellcheck-enabled",
    name: "spellcheck",
    spellcheck: true,
  },
};

export const WithSpellcheckDisabled: Story = {
  args: {
    label: "Spellcheck is disabled",
    id: "textarea-with-spellcheck-disabled",
    name: "spellcheck",
    spellcheck: false,
  },
};

export const Id: Story = {
  args: { id: "textarea-id", name: "test-name", label: "With custom id" },
};

export const Classes: Story = {
  args: {
    id: "with-classes",
    name: "with-classes",
    label: "With classes",
    classes: "app-textarea--custom-modifier",
  },
};

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    name: "with-attributes",
    label: "With attributes",
    attributes: { "data-attribute": "my data value" },
  },
};

export const WithDescribedBy: Story = {
  args: {
    id: "with-describedby",
    name: "with-describedby",
    label: "With describedBy",
    describedBy: "test-target-element",
  },
};

export const WithHintAndDescribedBy: Story = {
  args: {
    id: "with-hint-describedby",
    name: "with-hint-describedby",
    label: "With hint and describedBy",
    describedBy: "test-target-element",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
  },
};

export const WithErrorMessageAndDescribedBy: Story = {
  args: {
    name: "textarea-with-error",
    label: "Textarea with error",
    describedBy: "test-target-element",
    id: "textarea-with-error",
    errorMessage: "Error message",
  },
};

export const WithHintAndErrorMessage: Story = {
  args: {
    id: "with-hint-error",
    name: "with-hint-error",
    label: "With hint and error",
    errorMessage: "Error message",
    hint: "Hint",
  },
};

export const WithHintErrorMessageAndDescribedBy: Story = {
  args: {
    id: "with-hint-error-describedby",
    name: "with-hint-error-describedby",
    label: "With hint, error and describedBy",
    describedBy: "test-target-element",
    errorMessage: "Error message",
    hint: "Hint",
  },
};
