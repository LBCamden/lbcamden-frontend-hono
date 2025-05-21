import { Meta, StoryObj } from "@storybook/html";
import { Radios } from "./Radios";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Radios>;

export default {
  component: renderHtmlStory(Radios),
} satisfies Meta<typeof Radios>;

export const Default: Story = {
  args: {
    name: "example-default",
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const Inline: Story = {
  args: {
    idPrefix: "example",
    classes: "govuk-radios--inline",
    name: "example",
    fieldset: { legend: "Have you changed your name?" },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No", checked: true },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    idPrefix: "gov",
    name: "gov",
    fieldset: {
      legend: {
        content: "How do you want to sign in?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      {
        value: "gateway",
        content: "Sign in with Government Gateway",
        id: "gateway",
        hint: "You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before.",
      },
      {
        value: "verify",
        content: "Sign in with GOV.UK Verify",
        id: "verify",
        hint: "You’ll have an account if you’ve already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
        disabled: true,
      },
    ],
  },
};

export const WithLegendAsPageHeading: Story = {
  args: {
    idPrefix: "housing-act",
    name: "housing-act",
    fieldset: {
      legend: {
        content: "Which part of the Housing Act was your licence issued under?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    hint: "Select one of the options below.",
    items: [
      {
        value: "part-2",
        content: (
          <>
            <span class="govuk-heading-s govuk-!-margin-bottom-1">
              Part 2 of the Housing Act 2004
            </span>{" "}
            For properties that are 3 or more stories high and occupied by 5 or
            more people
          </>
        ),
      },
      {
        value: "part-3",
        content: (
          <>
            <span class="govuk-heading-s govuk-!-margin-bottom-1">
              Part 3 of the Housing Act 2004
            </span>{" "}
            For properties that are within a geographical area defined by a
            local council
          </>
        ),
      },
    ],
  },
};

export const WithAMediumLegend: Story = {
  args: {
    idPrefix: "housing-act",
    name: "housing-act",
    fieldset: {
      legend: {
        content: "Which part of the Housing Act was your licence issued under?",
        classes: "govuk-fieldset__legend--m",
      },
    },
    hint: "Select one of the options below.",
    items: [
      {
        value: "part-2",
        content: (
          <>
            <span class="govuk-heading-s govuk-!-margin-bottom-1">
              Part 2 of the Housing Act 2004
            </span>{" "}
            For properties that are 3 or more stories high and occupied by 5 or
            more people
          </>
        ),
      },
      {
        value: "part-3",
        content: (
          <>
            <span class="govuk-heading-s govuk-!-margin-bottom-1">
              Part 3 of the Housing Act 2004
            </span>{" "}
            For properties that are within a geographical area defined by a
            local council
          </>
        ),
      },
    ],
  },
};

export const WithADivider: Story = {
  args: {
    idPrefix: "example-divider",
    name: "example",
    fieldset: { legend: "How do you want to sign in?" },
    items: [
      { value: "government-gateway", content: "Use Government Gateway" },
      { value: "govuk-verify", content: "Use GOV.UK Verify" },
      { divider: "or" },
      { value: "create-account", content: "Create an account" },
    ],
  },
};

export const WithHintsOnItems: Story = {
  args: {
    idPrefix: "gov",
    name: "gov",
    fieldset: {
      legend: {
        content: "How do you want to sign in?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      {
        value: "gateway",
        content: "Sign in with Government Gateway",
        id: "gateway",
        hint: "You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before.",
      },
      {
        value: "verify",
        content: "Sign in with GOV.UK Verify",
        id: "verify",
        hint: "You’ll have an account if you’ve already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
      },
    ],
  },
};

export const WithoutFieldset: Story = {
  args: {
    name: "colours",
    items: [
      { value: "red", content: "Red" },
      { value: "green", content: "Green" },
      { value: "blue", content: "Blue" },
    ],
  },
};

export const WithFieldsetAndErrorMessage: Story = {
  args: {
    idPrefix: "example",
    name: "example",
    errorMessage: "Please select an option",
    fieldset: { legend: "Have you changed your name?" },
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No", checked: true },
    ],
  },
};

export const WithVeryLongOptionText: Story = {
  args: {
    name: "waste",
    hint: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
    errorMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    fieldset: { legend: "Maecenas faucibus mollis interdum?" },
    items: [
      {
        value: "nullam",
        content:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus.",
      },
      {
        value: "aenean",
        content:
          "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.",
      },
      {
        value: "fusce",
        content:
          "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Sed posuere consectetur est at lobortis.",
      },
    ],
  },
};

export const WithConditionalItems: Story = {
  args: {
    idPrefix: "how-contacted",
    name: "how-contacted",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Email address
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      {
        value: "phone",
        content: "Phone",
        conditional: (
          <>
            <label class="govuk-label" for="contact-phone">
              Phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
            />
          </>
        ),
      },
      {
        value: "text",
        content: "Text message",
        conditional: (
          <>
            <label class="govuk-label" for="contact-text-message">
              Mobile phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        ),
      },
    ],
  },
};

export const WithConditionalItemsWithSpecialCharacters: Story = {
  args: {
    idPrefix: "user.profile[contact-prefs]",
    name: "contact-prefs",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Email address
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      {
        value: "phone",
        content: "Phone",
        conditional: (
          <>
            <label class="govuk-label" for="contact-phone">
              Phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
            />
          </>
        ),
      },
      {
        value: "text",
        content: "Text message",
        conditional: (
          <>
            <label class="govuk-label" for="contact-text-message">
              Mobile phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        ),
      },
    ],
  },
};

export const WithConditionalItemChecked: Story = {
  args: {
    idPrefix: "how-contacted-checked",
    name: "how-contacted-checked",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        checked: true,
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Email
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      {
        value: "phone",
        content: "Phone",
        conditional: (
          <>
            <label class="govuk-label" for="contact-phone">
              Phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
            />
          </>
        ),
      },
      {
        value: "text",
        content: "Text message",
        conditional: (
          <>
            <label class="govuk-label" for="contact-text-message">
              Mobile phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        ),
      },
    ],
  },
};

export const Prechecked: Story = {
  args: {
    name: "example-default",
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No", checked: true },
    ],
  },
};

export const PrecheckedUsingValue: Story = {
  args: {
    name: "example-default",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
    value: "no",
  },
};

export const WithConditionalItemsAndPreCheckedValue: Story = {
  args: {
    idPrefix: "how-contacted-checked",
    name: "how-contacted-checked",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Email
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      {
        value: "phone",
        content: "Phone",
        conditional: (
          <>
            <label class="govuk-label" for="contact-phone">
              Phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
            />
          </>
        ),
      },
      {
        value: "text",
        content: "Text message",
        conditional: (
          <>
            <label class="govuk-label" for="contact-text-message">
              Mobile phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        ),
      },
    ],
    value: "text",
  },
};

export const WithOptionalFormGroupClassesShowingGroupError: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-form-group--error" },
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Email address
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      {
        value: "phone",
        content: "Phone",
        checked: true,
        conditional: (
          <>
            <label class="govuk-label" for="contact-phone">
              Phone number
            </label>
            <span id="contact-phone-error" class="govuk-error-message">
              Problem with input
            </span>
            <input
              class="govuk-input govuk-input--error govuk-!-width-one-third"
              name="contact-phone"
              type="text"
              id="contact-phone"
              aria-describedby="contact-phone-error"
            />
          </>
        ),
      },
      {
        value: "text",
        content: "Text message",
        conditional: (
          <>
            <label class="govuk-label" for="contact-text-message">
              Mobile phone number
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="contact-text-message"
              type="text"
              id="contact-text-message"
            />
          </>
        ),
      },
    ],
  },
};

export const Small: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-radios--small" },
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      { value: "email", content: "Email" },
      { value: "phone", content: "Phone" },
      { value: "text", content: "Text message" },
    ],
  },
};

export const SmallWithLongText: Story = {
  args: {
    idPrefix: "foo",
    name: "foo",
    classes: "govuk-radios--small",
    fieldset: { legend: "Venenatis Condimentum" },
    items: [
      {
        value: "nullam",
        content:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus.",
      },
      {
        value: "aenean",
        content:
          "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum.",
      },
      {
        value: "fusce",
        content:
          "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Sed posuere consectetur est at lobortis.",
      },
    ],
  },
};

export const SmallWithError: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-radios--small" },
    fieldset: { legend: "How do you want to be contacted?" },
    errorMessage: "Select a thing",
    items: [
      { value: "email", content: "Email" },
      { value: "phone", content: "Phone" },
      { value: "text", content: "Text message" },
    ],
  },
};

export const SmallWithHint: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-radios--small" },
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      { value: "email", content: "Email", hint: "Hint for email address" },
      { value: "phone", content: "Phone" },
      { value: "text", content: "Text message" },
    ],
  },
};

export const SmallWithDisabled: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-radios--small" },
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      { value: "email", content: "Email" },
      { value: "phone", content: "Phone" },
      { value: "text", content: "Text message", disabled: true },
    ],
  },
};

export const SmallWithConditionalReveal: Story = {
  args: {
    idPrefix: "how-contacted-2",
    name: "how-contacted-2",
    formGroup: { classes: "govuk-radios--small" },
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        conditional: (
          <>
            <label class="govuk-label" for="context-email">
              Foo
            </label>
            <input
              class="govuk-input govuk-!-width-one-third"
              name="context-email"
              type="text"
              id="context-email"
            />
          </>
        ),
      },
      { value: "phone", content: "Phone" },
      { value: "text", content: "Text message" },
    ],
  },
};

export const SmallInline: Story = {
  args: {
    idPrefix: "sort",
    classes: "govuk-radios--small govuk-radios--inline",
    name: "example",
    fieldset: { legend: "Sort by" },
    items: [
      { value: "relevance", content: "relevance" },
      { value: "title", content: "title" },
      { value: "created", content: "created" },
    ],
  },
};

export const SmallInlineExtreme: Story = {
  args: {
    idPrefix: "sort",
    classes: "govuk-radios--small govuk-radios--inline",
    name: "example",
    fieldset: { legend: "Sort by" },
    items: [
      { value: "relevance", content: "relevance" },
      { value: "title", content: "title" },
      { value: "created", content: "created" },
      { value: "modified", content: "modified" },
      { value: "category", content: "category" },
      { value: "votes", content: "votes" },
      { value: "flavour", content: "flavour" },
      { value: "hue", content: "hue" },
      { value: "happiness", content: "happiness" },
      { value: "funkiness", content: "funkiness" },
    ],
  },
};

export const SmallWithADivider: Story = {
  args: {
    idPrefix: "example-small-divider",
    name: "example",
    fieldset: { legend: "How do you want to sign in?" },
    classes: "govuk-radios--small",
    items: [
      { value: "government-gateway", content: "Use Government Gateway" },
      { value: "govuk-verify", content: "Use GOV.UK Verify" },
      { divider: "or" },
      { value: "create-account", content: "Create an account" },
    ],
  },
};

export const WithIdPrefix: Story = {
  args: {
    name: "example-radio",
    idPrefix: "example-id-prefix",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const MinimalItemsAndName: Story = {
  args: {
    name: "example-name",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithFalsyItems: Story = {
  args: {
    name: "example-name",
    items: [
      { value: "yes", content: "Yes" },
      null,
      false,
      { value: "no", content: "No" },
    ],
  },
};

export const FieldsetWithDescribedBy: Story = {
  args: {
    name: "example-name",
    fieldset: { describedBy: "test-target-element", legend: "Which option?" },
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const Attributes: Story = {
  args: {
    name: "example-name",
    attributes: {
      "data-attribute": "value",
      "data-second-attribute": "second-value",
    },
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const ItemsWithAttributes: Story = {
  args: {
    name: "example-name",
    items: [
      {
        value: "yes",
        content: "Yes",
        attributes: { "data-attribute": "ABC", "data-second-attribute": "DEF" },
      },
      {
        value: "no",
        content: "No",
        attributes: { "data-attribute": "GHI", "data-second-attribute": "JKL" },
      },
    ],
  },
};

export const WithEmptyConditional: Story = {
  args: {
    name: "example-conditional",
    items: [
      { value: "yes", content: "Yes", conditional: false },
      { value: "no", content: "No" },
    ],
  },
};

export const LabelWithClasses: Story = {
  args: {
    name: "example-label-classes",
    items: [{ value: "yes", content: "Yes", label: { classes: "bold" } }],
  },
};

export const WithHintsOnParentAndItems: Story = {
  args: {
    name: "example-multiple-hints",
    fieldset: { legend: "Have you changed your name?" },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes", hint: "Hint for yes option here" },
      { value: "no", content: "No", hint: "Hint for no option here" },
    ],
  },
};

export const WithDescribedByAndHint: Story = {
  args: {
    name: "example-hint-describedby",
    fieldset: {
      describedBy: "test-target-element",
      legend: "Have you changed your name?",
    },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithErrorMessage: Story = {
  args: {
    name: "example-error-message",
    errorMessage: "Please select an option",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithErrorMessageAndIdPrefix: Story = {
  args: {
    name: "example-error-message",
    idPrefix: "id-prefix",
    errorMessage: "Please select an option",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithHintAndErrorMessage: Story = {
  args: {
    name: "example-error-message-hint",
    errorMessage: "Please select an option",
    fieldset: { legend: "Have you changed your name?" },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithHintErrorMessageAndDescribedBy: Story = {
  args: {
    name: "example-error-message-hint",
    errorMessage: "Please select an option",
    fieldset: {
      describedBy: "test-target-element",
      legend: "Have you changed your name?",
    },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const LabelWithAttributes: Story = {
  args: {
    name: "with-label-attributes",
    items: [
      {
        value: "yes",
        content: "Yes",
        label: {
          attributes: {
            "data-attribute": "value",
            "data-second-attribute": "second-value",
          },
        },
      },
    ],
  },
};

export const FieldsetParams: Story = {
  args: {
    name: "example-fieldset-params",
    fieldset: {
      classes: "app-fieldset--custom-modifier",
      legend: "Have you changed your name?",
      attributes: {
        "data-attribute": "value",
        "data-second-attribute": "second-value",
      },
    },
    hint: "This includes changing your last name or spelling your name differently.",
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const FieldsetWithHtml: Story = {
  args: {
    name: "with-fieldset-html",
    fieldset: { legend: "Have <b>you</b> changed your name?" },
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No" },
    ],
  },
};

export const WithFieldsetErrorMessageAndDescribedBy: Story = {
  args: {
    idPrefix: "example",
    name: "example",
    errorMessage: "Please select an option",
    fieldset: {
      describedBy: "test-target-element",
      legend: "Have you changed your name?",
    },
    items: [
      { value: "yes", content: "Yes" },
      { value: "no", content: "No", checked: true },
    ],
  },
};

export const ItemCheckedOverridesValue: Story = {
  args: {
    name: "colors",
    items: [
      { value: "red", content: "Red" },
      { value: "green", content: "Green", checked: false },
      { value: "blue", content: "Blue" },
    ],
    value: "green",
  },
};

export const TextareaInConditional: Story = {
  args: {
    name: "conditional",
    items: [
      {
        value: "other",
        content: "Other",
        conditional: (
          <>
            <label class="govuk-label" for="conditional-textarea">
              textarea
            </label>
            <textarea
              class="govuk-textarea govuk-!-width-one-third"
              name="conditional-textarea"
              id="conditional-textarea"
            >
              test
            </textarea>
          </>
        ),
      },
    ],
  },
};
