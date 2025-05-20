import { Meta, StoryObj } from "@storybook/html";
import { CharacterCount } from "./CharacterCount";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof CharacterCount>;

export default {
  component: renderHtmlStory(CharacterCount),
} satisfies Meta<typeof CharacterCount>;

export const Default: Story = {
  args: {
    name: "more-detail",
    maxlength: 10,
    label: "Can you provide more detail?",
  },
};

export const WithCustomTextareaDescription: Story = {
  args: {
    name: "custom-textarea-description",
    id: "custom-textarea-description",
    maxlength: 10,
    label: "Can you provide more detail?",
    textareaDescription: "Gallwch ddefnyddio hyd at %{count} nod",
  },
};

export const WithHint: Story = {
  args: {
    name: "with-hint",
    id: "with-hint",
    maxlength: 10,
    label: "Can you provide more detail?",
    hint: "Don't include personal or financial information, eg your National Insurance number or credit card details.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    id: "with-default-value",
    name: "default-value",
    maxlength: 100,
    label: "Full address",
    value: "221B Baker Street\nLondon\nNW1 6XE\n",
  },
};

export const WithDefaultValueExceedingLimit: Story = {
  args: {
    id: "exceeding-characters",
    name: "exceeding",
    maxlength: 10,
    value: "221B Baker Street\nLondon\nNW1 6XE\n",
    label: "Full address",
    errorMessage: "Please do not exceed the maximum allowed limit",
  },
};

export const WithCustomRows: Story = {
  args: {
    id: "custom-rows",
    name: "custom",
    maxlength: 10,
    label: "Full address",
    rows: 8,
  },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    id: "textarea-with-page-heading",
    name: "address",
    maxlength: 10,
    label: {
      children: "Full address",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
  },
};

export const WithWordCount: Story = {
  args: {
    id: "word-count",
    name: "word-count",
    maxwords: 10,
    label: "Full address",
  },
};

export const WithThreshold: Story = {
  args: {
    id: "with-threshold",
    name: "with-threshold",
    maxlength: 10,
    threshold: 75,
    label: "Full address",
  },
};

export const WithTranslations: Story = {
  args: {
    id: "with-translations",
    name: "with-translations",
    maxlength: 10,
    label: "Full address",
    charactersUnderLimit: {
      other: "%{count} characters to go",
      one: "One character to go",
    },
    charactersAtLimit: "Zero characters left",
    charactersOverLimit: {
      other: "%{count} characters too many",
      one: "One character too many",
    },
    wordsUnderLimit: { other: "%{count} words to go", one: "One word to go" },
    wordsAtLimit: "Zero words left",
    wordsOverLimit: {
      other: "%{count} words too many",
      one: "One word too many",
    },
  },
};

export const Classes: Story = {
  args: {
    id: "with-classes",
    name: "with-classes",
    maxlength: 10,
    label: "With classes",
    classes: "app-character-count--custom-modifier",
  },
};

export const Id: Story = {
  args: {
    id: "character-count-id",
    name: "test-name",
    maxlength: 10,
    label: "With custom id",
  },
};

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    name: "with-attributes",
    maxlength: 10,
    label: "With attributes",
    attributes: { "data-attribute": "my data value" },
  },
};

export const FormGroupWithClasses: Story = {
  args: {
    id: "with-formgroup",
    name: "with-formgroup",
    maxlength: 10,
    label: "With formgroup",
    formGroup: { classes: "app-character-count--custom-modifier" },
  },
};

export const CustomClassesOnCountMessage: Story = {
  args: {
    id: "with-custom-countmessage-class",
    name: "with-custom-countmessage-class",
    maxlength: 10,
    label: "With custom countMessage class",
    countMessage: { classes: "app-custom-count-message" },
  },
};

export const SpellcheckEnabled: Story = {
  args: {
    id: "with-spellcheck",
    name: "with-spellcheck",
    maxlength: 10,
    label: "With spellcheck",
    spellcheck: true,
  },
};

export const SpellcheckDisabled: Story = {
  args: {
    id: "without-spellcheck",
    name: "without-spellcheck",
    maxlength: 10,
    label: "Without spellcheck",
    spellcheck: false,
  },
};

export const CustomClassesWithErrorMessage: Story = {
  args: {
    id: "with-custom-error-class",
    name: "with-custom-error-class",
    maxlength: 10,
    label: "With custom error class",
    classes: "app-character-count--custom-modifier",
    errorMessage: "Error message",
  },
};

export const WithIdStartingWithNumber: Story = {
  args: {
    name: "more-detail",
    id: "1_more-detail",
    maxlength: 10,
    label: "Can you provide more detail?",
  },
};

export const WithIdWithSpecialCharacters: Story = {
  args: {
    id: "user1.profile[address]",
    name: "address",
    maxlength: 10,
    label: "Full address",
  },
};

export const WithTextareaMaxlengthAttribute: Story = {
  args: {
    id: "maxlength-should-be-removed",
    name: "address",
    maxlength: 10,
    attributes: { maxlength: 10 },
    label: "Full address",
  },
};

export const ToConfigureInJavaScript: Story = {
  args: {
    id: "to-configure-in-javascript",
    name: "address",
    label: "Full address",
  },
};

export const WhenNeitherMaxlengthNorMaxwordsAreSet: Story = {
  args: {
    id: "no-maximum",
    name: "no-maximum",
    label: "Full address",
    textareaDescription: "No more than %{count} characters",
  },
};

export const WhenNeitherMaxlengthMaxwordsNorTextareaDescriptionAreSet: Story = {
  args: { id: "no-maximum", name: "no-maximum", label: "Full address" },
};
