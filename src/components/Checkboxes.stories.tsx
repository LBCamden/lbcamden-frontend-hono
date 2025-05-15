import { Meta, StoryObj } from "@storybook/html";
import { Checkboxes, CheckboxesProps } from "./Checkboxes";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<CheckboxesProps>;

export default {
  component: renderHtmlStory(Checkboxes),
} satisfies Meta<CheckboxesProps>;

export const Default: Story = {
  args: {
    name: "nationality",
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
      { value: "other", content: "Citizen of another country" },
    ],
  },
};

export const WithPreCheckedValues: Story = {
  args: {
    name: "nationality",
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
      {
        value: "other",
        content: "Citizen of another country",
        conditional: (
          <div class="govuk-form-group">
            <label class="govuk-label" for="other-country">
              Country
            </label>
            <input
              class="govuk-input"
              id="other-country"
              name="other-country"
              type="text"
              value="Ravka"
            />
          </div>
        ),
      },
    ],
    values: ["british", "other"],
  },
};

export const WithDividerAndNone: Story = {
  args: {
    name: "with-divider-and-none",
    fieldset: {
      legend: {
        content: "Which types of waste do you transport regularly?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      { value: "animal", content: "Waste from animal carcasses" },
      { value: "mines", content: "Waste from mines or quarries" },
      { value: "farm", content: "Farm or agricultural waste" },
      { divider: "or" },
      { value: "none", content: "None of these", behaviour: "exclusive" },
    ],
  },
};

export const WithDividerNoneAndConditionalItems: Story = {
  args: {
    name: "with-divider-and-none-and-conditional-items",
    fieldset: {
      legend: {
        content: "Do you have any access needs?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      { value: "accessible-toilets", content: "Accessible toilets available" },
      { value: "braille", content: "Braille translation service available" },
      {
        value: "disabled-car-parking",
        content: "Disabled car parking available",
      },
      {
        value: "another-access-need",
        content: "Another access need",
        conditional: (
          <>
            <label class="govuk-label" for="other-access-needs">
              Other access needs
            </label>
            <textarea
              class="govuk-textarea govuk-!-width-one-third"
              name="other-access-needs"
              id="other-access-needs"
            ></textarea>
          </>
        ),
      },
      { divider: "or" },
      { value: "none", content: "None of these", behaviour: "exclusive" },
    ],
  },
};

export const WithIdAndName: Story = {
  args: {
    name: "with-id-and-name",
    fieldset: { legend: "What is your nationality?" },
    hint: "If you have dual nationality, select all options that are relevant to you.",
    items: [
      {
        name: "british",
        id: "item_british",
        value: "yes",
        content: "British",
      },
      { name: "irish", id: "item_irish", value: "irish", content: "Irish" },
      { name: "custom-name-scottish", content: "Scottish", value: "scottish" },
    ],
  },
};

export const WithHintsOnItems: Story = {
  args: {
    name: "with-hints-on-items",
    fieldset: {
      legend: {
        content: "How do you want to sign in?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      {
        name: "gateway",
        id: "government-gateway",
        value: "gov-gateway",
        content: "Sign in with Government Gateway",
        hint: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
      },
      {
        name: "verify",
        id: "govuk-verify",
        value: "gov-verify",
        content: "Sign in with GOV.UK Verify",
        hint: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
      },
    ],
  },
};

export const WithDisabledItem: Story = {
  args: {
    name: "sign-in",
    fieldset: {
      legend: {
        content: "How do you want to sign in?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    items: [
      {
        name: "gateway",
        id: "government-gateway",
        value: "gov-gateway",
        content: "Sign in with Government Gateway",
        hint: "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before.",
      },
      {
        name: "verify",
        id: "govuk-verify",
        value: "gov-verify",
        content: "Sign in with GOV.UK Verify",
        hint: "You'll have an account if you've already proved your identity with either Barclays, CitizenSafe, Digidentity, Experian, Post Office, Royal Mail or SecureIdentity.",
        disabled: true,
      },
    ],
  },
};

export const WithLegendAsAPageHeading: Story = {
  args: {
    name: "waste",
    fieldset: {
      legend: {
        content: "Which types of waste do you transport regularly?",
        classes: "govuk-fieldset__legend--l",
        isPageHeading: true,
      },
    },
    hint: "Select all that apply",
    items: [
      { value: "animal", content: "Waste from animal carcasses" },
      { value: "mines", content: "Waste from mines or quarries" },
      { value: "farm", content: "Farm or agricultural waste" },
    ],
  },
};

export const WithAMediumLegend: Story = {
  args: {
    name: "waste",
    fieldset: {
      legend: {
        content: "Which types of waste do you transport regularly?",
        classes: "govuk-fieldset__legend--m",
      },
    },
    hint: "Select all that apply",
    errorMessage: "Select which types of waste you transport regularly",
    items: [
      { value: "animal", content: "Waste from animal carcasses" },
      { value: "mines", content: "Waste from mines or quarries" },
      { value: "farm", content: "Farm or agricultural waste" },
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

export const WithSingleOptionSetAriaDescribedbyOnInput: Story = {
  args: {
    name: "t-and-c",
    errorMessage: "Please accept the terms and conditions",
    items: [{ value: "yes", content: "I agree to the terms and conditions" }],
  },
};

export const WithSingleOptionAndHintSetAriaDescribedbyOnInput: Story = {
  args: {
    name: "t-and-c-with-hint",
    errorMessage: "Please accept the terms and conditions",
    items: [
      {
        value: "yes",
        content: "I agree to the terms and conditions",
        hint: "Go on, you know you want to!",
      },
    ],
  },
};

export const WithFieldsetAndErrorMessage: Story = {
  args: {
    name: "nationality",
    errorMessage: "Please accept the terms and conditions",
    fieldset: { legend: "What is your nationality?" },
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
      { value: "other", content: "Citizen of another country" },
    ],
  },
};

export const WithErrorMessage: Story = {
  args: {
    name: "waste",
    errorMessage: "Please select an option",
    fieldset: { legend: "Which types of waste do you transport regularly?" },
    items: [
      { value: "animal", content: "Waste from animal carcasses" },
      { value: "mines", content: "Waste from mines or quarries" },
      { value: "farm", content: "Farm or agricultural waste" },
    ],
  },
};

export const WithErrorMessageAndHintsOnItems: Story = {
  args: {
    name: "waste",
    errorMessage: "Please select an option",
    fieldset: { legend: "Which types of waste do you transport regularly?" },
    items: [
      {
        value: "animal",
        content: "Waste from animal carcasses",
        hint: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
      },
      {
        value: "mines",
        content: "Waste from mines or quarries",
        hint: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
      },
      {
        value: "farm",
        content: "Farm or agricultural waste",
        hint: "Nullam id dolor id nibh ultricies vehicula ut id elit.",
      },
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
    name: "with-conditional-items",
    idPrefix: "how-contacted",
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
    name: "contact-prefs",
    idPrefix: "user.profile[contact-prefs]",
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
    name: "how-contacted-checked",
    idPrefix: "how-contacted-checked",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "email",
        content: "Email",
        checked: true,
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

export const WithOptionalFormGroupClassesShowingGroupError: Story = {
  args: {
    name: "how-contacted-checked",
    idPrefix: "how-contacted-checked",
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
    idPrefix: "nationality",
    name: "nationality",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "Filter by" },
    items: [
      { value: "a", content: "a thing" },
      { value: "b", content: "another thing" },
      { value: "c", content: "this thing" },
    ],
  },
};

export const SmallWithLongText: Story = {
  args: {
    idPrefix: "nationality",
    name: "nationality",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "Filter by" },
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
    idPrefix: "nationality",
    name: "nationality",
    classes: "govuk-checkboxes--small",
    errorMessage: "Select a thing",
    fieldset: { legend: "Filter by" },
    items: [
      { value: "a", content: "a thing" },
      { value: "b", content: "another thing" },
      { value: "c", content: "this thing" },
    ],
  },
};

export const SmallWithHint: Story = {
  args: {
    idPrefix: "nationality",
    name: "nationality",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "Filter by" },
    items: [
      { value: "a", content: "a thing", hint: "hint for a thing" },
      { value: "b", content: "another thing" },
      { value: "c", content: "this thing" },
    ],
  },
};

export const SmallWithDisabled: Story = {
  args: {
    idPrefix: "nationality",
    name: "nationality",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "Filter by" },
    items: [
      { value: "a", content: "a thing" },
      { value: "b", content: "another thing" },
      { value: "c", content: "this thing", disabled: true },
    ],
  },
};

export const SmallWithConditionalReveal: Story = {
  args: {
    name: "how-contacted",
    idPrefix: "how-contacted",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "How do you want to be contacted?" },
    items: [
      {
        value: "a",
        content: "a thing",
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
      { value: "b", content: "another thing" },
    ],
  },
};

export const SmallWithDividerAndNone: Story = {
  args: {
    name: "small-with-divider-and-none",
    classes: "govuk-checkboxes--small",
    fieldset: { legend: "Which types of waste do you transport regularly?" },
    items: [
      { value: "animal", content: "Waste from animal carcasses" },
      { value: "mines", content: "Waste from mines or quarries" },
      { value: "farm", content: "Farm or agricultural waste" },
      { divider: "or" },
      { value: "none", content: "None of these", behaviour: "exclusive" },
    ],
  },
};

export const WithIdPrefix: Story = {
  args: {
    name: "example-name",
    idPrefix: "nationality",
    items: [
      { value: 1, content: "Option 1" },
      { value: 2, content: "Option 2" },
    ],
  },
};

export const WithFalsyValues: Story = {
  args: {
    name: "example-name",
    items: [
      { value: 1, content: "Option 1" },
      false,
      null,
      "",
      { value: 2, content: "Option 2" },
    ],
  },
};

export const Classes: Story = {
  args: {
    name: "example-name",
    classes: "app-checkboxes--custom-modifier",
    items: [
      { value: 1, content: "Option 1" },
      { value: 2, content: "Option 2" },
    ],
  },
};

export const WithFieldsetDescribedBy: Story = {
  args: {
    name: "example-name",
    fieldset: { describedBy: "test-target-element", legend: "Which option?" },
    items: [
      { value: 1, content: "Option 1" },
      { value: 2, content: "Option 2" },
    ],
    hint: "If you have dual nationality, select all options that are relevant to you.",
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
      { value: 1, content: "Option 1" },
      { value: 2, content: "Option 2" },
    ],
  },
};

export const WithCheckedItem: Story = {
  args: {
    name: "example-name",
    items: [
      { value: 1, content: "Option 1" },
      { value: 2, content: "Option 2", checked: true },
      { value: 3, content: "Option 3", checked: true },
    ],
  },
};

export const ItemsWithAttributes: Story = {
  args: {
    name: "example-name",
    items: [
      {
        value: 1,
        content: "Option 1",
        attributes: { "data-attribute": "ABC", "data-second-attribute": "DEF" },
      },
      {
        value: 2,
        content: "Option 2",
        attributes: { "data-attribute": "GHI", "data-second-attribute": "JKL" },
      },
    ],
  },
};

export const EmptyConditional: Story = {
  args: {
    name: "example-conditional",
    items: [{ value: "foo", content: "Foo", conditional: false }],
  },
};

export const WithLabelClasses: Story = {
  args: {
    name: "example-label-classes",
    items: [{ value: "yes", content: "Yes", label: { classes: "bold" } }],
  },
};

export const MultipleHints: Story = {
  args: {
    name: "example-multiple-hints",
    hint: "If you have dual nationality, select all options that are relevant to you.",
    items: [
      {
        value: "british",
        content: "British",
        hint: "Hint for british option here",
      },
      { value: "irish", content: "Irish" },
      {
        value: "other",
        content: "Citizen of another country",
        hint: "Hint for other option here",
      },
    ],
  },
};

export const WithErrorMessageAndHint: Story = {
  args: {
    name: "example",
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
    ],
    errorMessage: "Please select an option",
    fieldset: { legend: "What is your nationality?" },
    hint: "If you have dual nationality, select all options that are relevant to you.",
  },
};

export const WithErrorHintAndFieldsetDescribedBy: Story = {
  args: {
    name: "example",
    errorMessage: "Please select an option",
    fieldset: {
      describedBy: "test-target-element",
      legend: "What is your nationality?",
    },
    hint: "If you have dual nationality, select all options that are relevant to you.",
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
    ],
  },
};

export const LabelWithAttributes: Story = {
  args: {
    name: "example-name",
    items: [
      {
        value: 1,
        content: <b>Option 1</b>,
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
    name: "example-name",
    errorMessage: "Please select an option",
    fieldset: {
      legend: "What is your nationality?",
      classes: "app-fieldset--custom-modifier",
      attributes: {
        "data-attribute": "value",
        "data-second-attribute": "second-value",
      },
    },
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
    ],
  },
};

export const FieldsetHtmlParams: Story = {
  args: {
    name: "example-name",
    fieldset: { legend: "What is your <b>nationality</b>?" },
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
    ],
  },
};

export const WithSingleOptionSetAriaDescribedbyOnInputAndDescribedBy: Story = {
  args: {
    describedBy: "test-target-element",
    name: "t-and-c",
    errorMessage: "Please accept the terms and conditions",
    items: [{ value: "yes", content: "I agree to the terms and conditions" }],
  },
};

export const WithSingleOptionAndHintSetAriaDescribedbyOnInputAndDescribedBy: Story =
  {
    args: {
      describedBy: "test-target-element",
      name: "t-and-c-with-hint",
      errorMessage: "Please accept the terms and conditions",
      items: [
        {
          value: "yes",
          content: "I agree to the terms and conditions",
          hint: "Go on, you know you want to!",
        },
      ],
    },
  };

export const WithErrorAndIdPrefix: Story = {
  args: {
    name: "name-of-checkboxes",
    errorMessage: "Please select an option",
    idPrefix: "id-prefix",
    items: [{ value: "animal", content: "Waste from animal carcasses" }],
  },
};

export const WithErrorMessageAndFieldsetDescribedBy: Story = {
  args: {
    name: "example",
    errorMessage: "Please select an option",
    fieldset: {
      describedBy: "test-target-element",
      legend: "What is your nationality?",
    },
    items: [
      { value: "british", content: "British" },
      { value: "irish", content: "Irish" },
    ],
  },
};

export const ItemCheckedOverridesValues: Story = {
  args: {
    name: "colors",
    items: [
      { value: "red", content: "Red" },
      { value: "green", content: "Green", checked: false },
      { value: "blue", content: "Blue" },
    ],
    values: ["red", "green"],
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
