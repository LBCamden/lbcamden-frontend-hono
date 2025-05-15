import { Meta, StoryObj } from "@storybook/html";
import { ErrorSummary, ErrorSummaryProps } from "./ErrorSummary";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<ErrorSummaryProps>;

export default {
  component: renderHtmlStory(ErrorSummary),
} satisfies Meta<ErrorSummaryProps>;

export const Default: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      {
        content: "The date your passport was issued must be in the past",
        href: "#example-error-1",
      },
      { content: "Enter a postcode, like AA1 1AA", href: "#example-error-2" },
    ],
  },
};

export const WithoutLinks: Story = {
  args: {
    title: "There is a problem",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const MixedWithAndWithoutLinks: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      { content: "Invalid username or password" },
      {
        content: "Agree to the terms of service to log in",
        href: "#example-error-1",
      },
    ],
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    title: "There is a problem",
    description: "The file couldn't be loaded. Try again later.",
  },
};

export const WithEverything: Story = {
  args: {
    title: "There is a problem",
    description: "Please fix the errors below.",
    errorList: [
      { content: "Invalid username or password" },
      {
        content: "Agree to the terms of service to log in",
        href: "#example-error-1",
      },
    ],
  },
};

export const HtmlAsTitleText: Story = {
  args: {
    title: "Alert, <em>alert</em>",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const TitleHtml: Story = {
  args: {
    title: (
      <>
        Alert, <em>alert</em>
      </>
    ),
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const Description: Story = {
  args: {
    title: "There is a problem",
    description: "Lorem ipsum",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const HtmlAsDescriptionText: Story = {
  args: {
    title: "There is a problem",
    description: "See errors below (>)",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const DescriptionHtml: Story = {
  args: {
    title: "There is a problem",
    description: "See <span>errors</span> below",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const Classes: Story = {
  args: {
    title: "There is a problem",
    classes: "extra-class one-more-class",
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const Attributes: Story = {
  args: {
    title: "There is a problem",
    attributes: { "first-attribute": "foo", "second-attribute": "bar" },
    errorList: [{ content: "Invalid username or password" }],
  },
};

export const ErrorListWithAttributes: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      {
        content: "Error-1",
        href: "#item",
        attributes: {
          "data-attribute": "my-attribute",
          "data-attribute-2": "my-attribute-2",
        },
      },
    ],
  },
};

export const ErrorListWithHtmlAsText: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      { content: "Descriptive link to the <b>question</b> with an error" },
    ],
  },
};

export const ErrorListWithHtml: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      {
        content: "The date your passport was issued <b>must</b> be in the past",
      },
    ],
  },
};

export const ErrorListWithHtmlLink: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      {
        content: "Descriptive link to the <b>question</b> with an error",
        href: "#error-1",
      },
    ],
  },
};

export const ErrorListWithHtmlAsTextLink: Story = {
  args: {
    title: "There is a problem",
    errorList: [
      {
        content: "Descriptive link to the <b>question</b> with an error",
        href: "#error-1",
      },
    ],
  },
};

export const AutofocusDisabled: Story = {
  args: { title: "There is a problem", disableAutoFocus: true },
};

export const AutofocusExplicitlyEnabled: Story = {
  args: { title: "There is a problem", disableAutoFocus: false },
};
