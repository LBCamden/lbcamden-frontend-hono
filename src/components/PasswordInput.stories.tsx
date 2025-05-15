import { Meta, StoryObj } from "@storybook/html";
import { PasswordInput } from "./PasswordInput";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof PasswordInput>;

export default {
  component: renderHtmlStory(PasswordInput),
} satisfies Meta<typeof PasswordInput>;

export const Default: Story = { args: { label: "Password", name: "password" } };

export const WithHintText: Story = {
  args: {
    label: "Password",
    hint: "It probably has some letters, numbers and maybe even some symbols in it.",
    id: "password-input-with-hint-text",
    name: "test-name-2",
  },
};

export const WithErrorMessage: Story = {
  args: {
    label: "Password",
    hint: "It probably has some letters, numbers and maybe even some symbols in it.",
    id: "password-input-with-error-message",
    name: "test-name-3",
    errorMessage: "Error message goes here",
  },
};

export const WithLabelAsPageHeading: Story = {
  args: {
    label: {
      children: "Password",
      classes: "govuk-label--l",
      isPageHeading: true,
    },
    id: "password-input-with-page-heading",
    name: "test-name",
  },
};

export const WithInputWidthClass: Story = {
  args: {
    label: "Password",
    id: "password-input-width",
    name: "password",
    classes: "govuk-input--width-10",
  },
};

export const WithNewPasswordAutocomplete: Story = {
  args: {
    label: "Password",
    autocomplete: "new-password",
    id: "password-input-new-password",
    name: "password",
  },
};

export const WithTranslations: Story = {
  args: {
    label: "Cyfrinair",
    id: "password-translated",
    name: "password-translated",
    showPassword: "Datguddia",
    hidePassword: "Cuddio",
    showPasswordAriaLabel: "Datgelu cyfrinair",
    hidePasswordAriaLabel: "Cuddio cyfrinair",
    passwordShownAnnouncement: "Mae eich cyfrinair yn weladwy.",
    passwordHiddenAnnouncement: "Mae eich cyfrinair wedi'i guddio.",
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
  args: { id: "password-id", name: "testing-name", label: "With custom id" },
};

export const Value: Story = {
  args: {
    id: "with-value",
    name: "with-value",
    label: "With value",
    value: "Hunter2",
  },
};

export const Attributes: Story = {
  args: {
    id: "with-attributes",
    name: "with-attributes",
    label: "With attributes",
    attributes: { "data-attribute": "value", "data-another": "ok" },
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
