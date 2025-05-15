import { Meta, StoryObj } from "@storybook/html";
import { Input } from "./Input";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Input>;

export default {
  component: renderHtmlStory(Input),
} satisfies Meta<typeof Input>;

export const Default: Story = {
  args: { label: "National Insurance number", name: "test-name" },
};

export const WithHintText: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-with-hint-text",
    name: "test-name-2",
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "National Insurance number",
    id: "input-with-error-message",
    name: "test-name-3",
    errorMessage: "Enter a National Insurance number in the correct format",
  },
};

export const WithErrorAndHint: Story = {
  args: {
    id: "with-error-hint",
    name: "with-error-hint",
    label: "National insurance number",
    errorMessage: "Enter a National Insurance number in the correct format",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
  },
};

export const WithWidth2Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-2",
    name: "test-width-2",
    classes: "govuk-input--width-2",
  },
};

export const WithWidth3Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-3",
    name: "test-width-3",
    classes: "govuk-input--width-3",
  },
};

export const WithWidth4Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-4",
    name: "test-width-4",
    classes: "govuk-input--width-4",
  },
};

export const WithWidth5Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-5",
    name: "test-width-5",
    classes: "govuk-input--width-5",
  },
};

export const WithWidth10Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-10",
    name: "test-width-10",
    classes: "govuk-input--width-10",
  },
};

export const WithWidth20Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-20",
    name: "test-width-20",
    classes: "govuk-input--width-20",
  },
};

export const WithWidth30Class: Story = {
  args: {
    label: "National insurance number",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
    id: "input-width-30",
    name: "test-width-30",
    classes: "govuk-input--width-30",
  },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    label: {
      children: "National Insurance number",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
    id: "input-with-page-heading",
    name: "test-name",
  },
};

export const WithOptionalFormGroupClasses: Story = {
  args: {
    label: "National Insurance number",
    id: "input-example",
    name: "test-name",
    formGroup: { classes: "extra-class" },
  },
};

export const WithAutocompleteAttribute: Story = {
  args: {
    label: "Postcode",
    id: "input-with-autocomplete-attribute",
    name: "postcode",
    autocomplete: "postal-code",
  },
};

export const WithPatternAttribute: Story = {
  args: {
    label: "Numbers only",
    id: "input-with-pattern-attribute",
    name: "numbers-only",
    type: "number",
    pattern: "[0-9]*",
  },
};

export const WithSpellcheckEnabled: Story = {
  args: {
    label: "Spellcheck is enabled",
    id: "input-with-spellcheck-enabled",
    name: "spellcheck",
    type: "text",
    spellcheck: true,
  },
};

export const WithSpellcheckDisabled: Story = {
  args: {
    label: "Spellcheck is disabled",
    id: "input-with-spellcheck-disabled",
    name: "spellcheck",
    type: "text",
    spellcheck: false,
  },
};

export const WithAutocapitalizeTurnedOff: Story = {
  args: {
    label: "Autocapitalize is turned off",
    id: "input-with-autocapitalize-off",
    name: "autocapitalize",
    type: "text",
    autocapitalize: "none",
  },
};

export const Disabled: Story = {
  args: { label: "Disabled input", id: "disabled-input", disabled: true },
};

export const WithPrefix: Story = {
  args: {
    label: "Amount, in pounds",
    id: "input-with-prefix",
    name: "amount",
    prefix: "£",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Weight, in kilograms",
    id: "input-with-suffix",
    name: "weight",
    suffix: "kg",
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    label: "Cost per item, in pounds",
    id: "input-with-prefix-suffix",
    name: "cost",
    prefix: "£",
    suffix: "per item",
  },
};

export const WithPrefixAndLongSuffix: Story = {
  args: {
    label: "Cost per item, in pounds, per household member",
    id: "input-with-prefix-suffix",
    name: "cost",
    prefix: "£",
    suffix: "per household member",
  },
};

export const WithPrefixAndSuffixAndError: Story = {
  args: {
    label: "Cost per item, in pounds",
    id: "input-with-prefix-suffix",
    name: "cost",
    prefix: "£",
    suffix: "per item",
    errorMessage: "Error message goes here",
  },
};

export const WithPrefixAndSuffixAndWidthModifier: Story = {
  args: {
    label: "Cost per item, in pounds",
    id: "input-with-prefix-suffix",
    name: "cost",
    classes: "govuk-input--width-5",
    prefix: "£",
    suffix: "per item",
  },
};

export const WithExtraLetterSpacing: Story = {
  args: {
    id: "input-with-extra-letter-spacing",
    label: "National insurance number",
    classes: "govuk-input--width-30 govuk-input--extra-letter-spacing",
    value: "QQ 12 34 56 C",
  },
};

export const Classes: Story = {
  args: {
    id: "with-classes",
    name: "with-classes",
    label: "With classes",
    classes: "app-input--custom-modifier",
  },
};

export const Id: Story = {
  args: { id: "input-id", name: "testing-name", label: "With custom id" },
};

export const CustomType: Story = {
  args: {
    id: "with-custom-type",
    name: "with-custom-type",
    label: "With custom type",
    type: "number",
  },
};

export const Value: Story = {
  args: {
    id: "with-value",
    name: "with-value",
    label: "With value",
    value: "QQ 12 34 56 C",
  },
};

export const ZeroValue: Story = {
  args: {
    id: "with-zero-value",
    name: "with-zero-value",
    label: "With zero value",
    value: 0,
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

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    name: "with-attributes",
    label: "With attributes",
    attributes: { "data-attribute": "my data value" },
  },
};

export const HintWithDescribedBy: Story = {
  args: {
    id: "with-hint-describedby",
    name: "with-hint-describedby",
    label: "With hint describedBy",
    describedBy: "test-target-element",
    hint: "It’s on your National Insurance card, benefit letter, payslip or P60. For example, ‘QQ 12 34 56 C’.",
  },
};

export const ErrorWithDescribedBy: Story = {
  args: {
    id: "with-error-describedby",
    name: "with-error-describedby",
    label: "With error describedBy",
    describedBy: "test-target-element",
    errorMessage: "Error message",
  },
};

export const WithErrorHintAndDescribedBy: Story = {
  args: {
    id: "with-error-hint-describedby",
    name: "with-error-hint-describedby",
    label: "With error, hint and describedBy",
    errorMessage: "Error message",
    hint: "Hint",
    describedBy: "test-target-element",
  },
};

export const Inputmode: Story = {
  args: {
    id: "with-inputmode",
    name: "with-inputmode",
    label: "With inputmode",
    inputmode: "decimal",
  },
};

export const WithPrefixWithHtmlAsText: Story = {
  args: {
    label: "Amount, in pounds",
    id: "input-with-prefix",
    name: "amount",
    prefix: <span>£</span>,
  },
};

export const WithPrefixWithHtml: Story = {
  args: {
    label: "Amount, in pounds",
    id: "input-with-prefix",
    name: "amount",
    prefix: <span>£</span>,
  },
};

export const WithPrefixWithClasses: Story = {
  args: {
    label: "Amount, in pounds",
    id: "input-with-prefix-element",
    name: "amount",
    prefix: { children: "£", classes: "app-input__prefix--custom-modifier" },
  },
};

export const WithPrefixWithAttributes: Story = {
  args: {
    label: "Amount, in pounds",
    id: "input-with-prefix-element",
    name: "amount",
    prefix: { children: "£", attributes: { "data-attribute": "value" } },
  },
};

export const WithSuffixWithHtmlAsText: Story = {
  args: {
    label: "Weight, in kilograms",
    id: "input-with-suffix",
    name: "weight",
    suffix: <span>kg</span>,
  },
};

export const WithSuffixWithHtml: Story = {
  args: {
    label: "Weight, in kilograms",
    id: "input-with-suffix",
    name: "weight",
    suffix: <span>kg</span>,
  },
};

export const WithSuffixWithClasses: Story = {
  args: {
    label: "Weight, in kilograms",
    id: "input-with-suffix",
    name: "weight",
    suffix: {
      children: <span>kg</span>,
      classes: "app-input__suffix--custom-modifier",
    },
  },
};

export const WithSuffixWithAttributes: Story = {
  args: {
    label: "Weight, in kilograms",
    id: "input-with-suffix",
    name: "weight",
    suffix: {
      children: <span>kg</span>,
      attributes: { "data-attribute": "value" },
    },
  },
};

export const WithCustomisedInputWrapper: Story = {
  args: {
    label: "Cost per item, in pounds",
    id: "input-with-customised-input-wrapper",
    name: "cost",
    inputWrapper: {
      classes: "app-input-wrapper--custom-modifier",
      attributes: { "data-attribute": "value" },
    },
    prefix: "£",
    suffix: "per item",
  },
};
