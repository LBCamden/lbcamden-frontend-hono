import { Meta, StoryObj } from "@storybook/html";
import { Select } from "./Select";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Select>;

export default {
  component: renderHtmlStory(Select),
} satisfies Meta<typeof Select>;

export const Default: Story = {
  args: {
    name: "select-1",
    label: "Label text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2", selected: true },
      { value: 3, content: "GOV.UK frontend option 3", disabled: true },
    ],
  },
};

export const Id: Story = {
  args: {
    id: "select-id",
    name: "test-name",
    label: "Horse with no name",
    items: [],
  },
};

export const WithNoItems: Story = {
  args: {
    id: "select-1",
    name: "select-1",
    label: "Horse with no name",
    items: [],
  },
};

export const WithSelectedValue: Story = {
  args: {
    id: "select-1",
    name: "select-1",
    label: "Label text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
      { value: 3, content: "GOV.UK frontend option 3", disabled: true },
    ],
    value: 2,
  },
};

export const WithHintTextAndErrorMessage: Story = {
  args: {
    id: "select-2",
    name: "select-2",
    label: "Label text goes here",
    hint: "Hint text goes here",
    errorMessage: "Error message goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
      { value: 3, content: "GOV.UK frontend option 3" },
    ],
  },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    id: "select-3",
    name: "select-3",
    label: {
      content: "Label text goes here",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2", selected: true },
      { value: 3, content: "GOV.UK frontend option 3", disabled: true },
    ],
  },
};

export const WithFullWidthOverride: Story = {
  args: {
    id: "select-1",
    name: "select-1",
    classes: "govuk-!-width-full",
    label: "Label text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2", selected: true },
      { value: 3, content: "GOV.UK frontend option 3", disabled: true },
    ],
  },
};

export const WithOptionalFormGroupClasses: Story = {
  args: {
    id: "select-1",
    name: "select-1",
    classes: "govuk-!-width-full",
    label: "Label text goes here",
    formGroup: { classes: "extra-class" },
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2", selected: true },
      { value: 3, content: "GOV.UK frontend option 3", disabled: true },
    ],
  },
};

export const WithDescribedBy: Story = {
  args: {
    id: "with-describedby",
    name: "with-describedby",
    label: "Label text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
    ],
    describedBy: "test-target-element",
  },
};

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    name: "with-attributes",
    label: "Label text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
    ],
    attributes: { "data-attribute": "my data value" },
  },
};

export const AttributesOnItems: Story = {
  args: {
    id: "with-item-attributes",
    name: "with-item-attributes",
    label: "Label text goes here",
    value: 2,
    items: [
      {
        content: "Option 1",
        value: 1,
        attributes: { "data-attribute": "ABC", "data-second-attribute": "DEF" },
      },
      {
        content: "Option 2",
        value: 2,
        attributes: { "data-attribute": "GHI", "data-second-attribute": "JKL" },
      },
    ],
  },
};

export const WithFalsyItems: Story = {
  args: {
    id: "with-falsy-items",
    name: "with-falsy-items",
    label: "Label text goes here",
    items: [
      { content: "Option 1", value: 1 },
      null,
      false,
      "",
      { content: "Options 2", value: 2 },
    ],
  },
};

export const Hint: Story = {
  args: {
    id: "select-with-hint",
    name: "select-with-hint",
    label: "Label text goes here",
    hint: "Hint text goes here",
  },
};

export const HintAndDescribedBy: Story = {
  args: {
    id: "select-with-hint",
    name: "select-with-hint",
    label: "Label text goes here",
    describedBy: "test-target-element",
    hint: "Hint text goes here",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
    ],
  },
};

export const Error: Story = {
  args: {
    id: "select-with-error",
    name: "select-with-error",
    label: "Label text goes here",
    errorMessage: "Error message",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
    ],
  },
};

export const ErrorAndDescribedBy: Story = {
  args: {
    id: "select-with-error",
    name: "select-with-error",
    label: "Label text goes here",
    describedBy: "test-target-element",
    errorMessage: "Error message",
    items: [
      { value: 1, content: "GOV.UK frontend option 1" },
      { value: 2, content: "GOV.UK frontend option 2" },
    ],
  },
};

export const WithoutValues: Story = {
  args: {
    name: "colors",
    id: "colors",
    label: "Label text goes here",
    items: [{ content: "Red" }, { content: "Green" }, { content: "Blue" }],
  },
};

export const WithoutValuesWithSelectedValue: Story = {
  args: {
    name: "colors",
    id: "colors",
    label: "Label text goes here",
    items: [{ content: "Red" }, { content: "Green" }, { content: "Blue" }],
    value: "Green",
  },
};

export const WithFalsyValues: Story = {
  args: {
    name: "falsy-values",
    id: "falsy-values",
    label: "Label text goes here",
    items: [
      { content: "Empty string", value: "" },
      { content: "Boolean false", value: false },
      { content: "Number zero", value: 0 },
    ],
  },
};

export const ItemSelectedOverridesValue: Story = {
  args: {
    name: "colors",
    id: "colors",
    label: "Label text goes here",
    items: [
      { value: "red", content: "Red" },
      { value: "green", content: "Green", selected: false },
      { value: "blue", content: "Blue" },
    ],
    value: "green",
  },
};
