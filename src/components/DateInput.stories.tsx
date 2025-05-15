import { Meta, StoryObj } from "@storybook/html";
import { DateInput } from "./DateInput";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof DateInput>;

export default {
  component: renderHtmlStory(DateInput),
} satisfies Meta<typeof DateInput>;

export const Default: Story = { args: { id: "dob" } };

export const CompleteQuestion: Story = {
  args: {
    id: "dob",
    namePrefix: "dob",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    items: [
      { name: "day", classes: "govuk-input--width-2" },
      { name: "month", classes: "govuk-input--width-2" },
      { name: "year", classes: "govuk-input--width-4" },
    ],
  },
};

export const DayAndMonth: Story = {
  args: {
    id: "bday",
    namePrefix: "bday",
    fieldset: { legend: "What is your birthday?" },
    hint: "For example, 5 12",
    items: [
      { name: "day", classes: "govuk-input--width-2" },
      { name: "month", classes: "govuk-input--width-2" },
    ],
  },
};

export const MonthAndYear: Story = {
  args: {
    id: "dob",
    namePrefix: "dob",
    fieldset: { legend: "When did you move to this property?" },
    hint: "For example, 3 1980",
    items: [
      { name: "month", classes: "govuk-input--width-2" },
      { name: "year", classes: "govuk-input--width-4" },
    ],
  },
};

export const WithErrorsOnly: Story = {
  args: {
    id: "dob-errors",
    fieldset: { legend: "What is your date of birth?" },
    errorMessage: "Error message goes here",
    items: [
      { name: "day", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "month", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "year", classes: "govuk-input--width-4 govuk-input--error" },
    ],
  },
};

export const WithErrorsAndHint: Story = {
  args: {
    id: "dob-errors",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    errorMessage: "Error message goes here",
    items: [
      { name: "day", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "month", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "year", classes: "govuk-input--width-4 govuk-input--error" },
    ],
  },
};

export const WithErrorOnDayInput: Story = {
  args: {
    id: "dob-day-error",
    namePrefix: "dob-day-error",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    errorMessage: "Error message goes here",
    items: [
      { name: "day", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "month", classes: "govuk-input--width-2" },
      { name: "year", classes: "govuk-input--width-4" },
    ],
  },
};

export const WithErrorOnMonthInput: Story = {
  args: {
    id: "dob-month-error",
    namePrefix: "dob-month-error",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    errorMessage: "Error message goes here",
    items: [
      { name: "day", classes: "govuk-input--width-2" },
      { name: "month", classes: "govuk-input--width-2 govuk-input--error" },
      { name: "year", classes: "govuk-input--width-4" },
    ],
  },
};

export const WithErrorOnYearInput: Story = {
  args: {
    id: "dob-year-error",
    namePrefix: "dob-year-error",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    errorMessage: "Error message goes here",
    items: [
      { name: "day", classes: "govuk-input--width-2" },
      { name: "month", classes: "govuk-input--width-2" },
      { name: "year", classes: "govuk-input--width-4 govuk-input--error" },
    ],
  },
};

export const WithDefaultItems: Story = {
  args: {
    id: "dob",
    namePrefix: "dob",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
  },
};

export const WithOptionalFormGroupClasses: Story = {
  args: {
    id: "dob",
    namePrefix: "dob",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    formGroup: { classes: "extra-class" },
  },
};

export const WithAutocompleteValues: Story = {
  args: {
    id: "dob-with-autocomplete-attribute",
    namePrefix: "dob-with-autocomplete",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    items: [
      {
        name: "day",
        classes: "govuk-input--width-2",
        autocomplete: "bday-day",
      },
      {
        name: "month",
        classes: "govuk-input--width-2",
        autocomplete: "bday-month",
      },
      {
        name: "year",
        classes: "govuk-input--width-4",
        autocomplete: "bday-year",
      },
    ],
  },
};

export const WithInputAttributes: Story = {
  args: {
    id: "dob-with-input-attributes",
    namePrefix: "dob-with-input-attributes",
    fieldset: { legend: "What is your date of birth?" },
    hint: "For example, 31 3 1980",
    items: [
      {
        name: "day",
        classes: "govuk-input--width-2",
        attributes: { "data-example-day": "day" },
      },
      {
        name: "month",
        classes: "govuk-input--width-2",
        attributes: { "data-example-month": "month" },
      },
      {
        name: "year",
        classes: "govuk-input--width-4",
        attributes: { "data-example-year": "year" },
      },
    ],
  },
};

export const Classes: Story = {
  args: { id: "with-classes", classes: "app-date-input--custom-modifier" },
};

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    attributes: { "data-attribute": "my data value" },
  },
};

export const WithEmptyItems: Story = {
  args: { id: "with-empty-items", items: [] },
};

export const CustomPattern: Story = {
  args: {
    id: "with-custom-pattern",
    items: [{ name: "day", pattern: "[0-8]*" }],
  },
};

export const CustomInputmode: Story = {
  args: {
    id: "with-custom-inputmode",
    items: [{ name: "day", pattern: "[0-9X]*", inputmode: "text" }],
  },
};

export const WithNestedName: Story = {
  args: {
    id: "with-nested-name",
    items: [{ name: "day[dd]" }, { name: "month[mm]" }, { name: "year[yyyy]" }],
  },
};

export const WithIdOnItems: Story = {
  args: {
    id: "with-item-id",
    items: [
      { id: "day", name: "day" },
      { id: "month", name: "month" },
      { id: "year", name: "year" },
    ],
  },
};

export const SuffixedId: Story = {
  args: {
    id: "my-date-input",
    items: [{ name: "day" }, { name: "month" }, { name: "year" }],
  },
};

export const WithValues: Story = {
  args: {
    id: "with-values",
    items: [
      { id: "day", name: "day" },
      { id: "month", name: "month" },
      { id: "year", name: "year", value: 2018 },
    ],
  },
};

export const WithHintAndDescribedBy: Story = {
  args: {
    id: "dob-errors",
    fieldset: {
      describedBy: "test-target-element",
      legend: "What is your date of birth?",
    },
    hint: "For example, 31 3 1980",
  },
};

export const WithErrorAndDescribedBy: Story = {
  args: {
    id: "dob-errors",
    fieldset: {
      describedBy: "test-target-element",
      legend: "What is your date of birth?",
    },
    errorMessage: "Error message goes here",
  },
};

export const FieldsetHtml: Story = {
  args: {
    id: "with-fieldset-html",
    fieldset: { legend: "What is your <b>date of birth</b>?" },
  },
};

export const ItemsWithClasses: Story = {
  args: {
    id: "with-item-classes",
    items: [
      { name: "day", classes: "app-date-input__day" },
      { name: "month", classes: "app-date-input__month" },
      { name: "year", classes: "app-date-input__year" },
    ],
  },
};

export const ItemsWithoutClasses: Story = {
  args: {
    id: "without-item-classes",
    items: [{ name: "day" }, { name: "month" }, { name: "year" }],
  },
};
