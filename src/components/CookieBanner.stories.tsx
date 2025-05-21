import { Meta, StoryObj } from "@storybook/html";
import { CookieBanner } from "./CookieBanner";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof CookieBanner>;

export default {
  component: renderHtmlStory(CookieBanner),
} satisfies Meta<typeof CookieBanner>;

export const Default: Story = {
  args: {
    messages: [
      {
        heading: "Cookies on this government service",
        content:
          "We use analytics cookies to help understand how users use our service.",
        actions: [
          {
            content: "Accept analytics cookies",
            type: "submit",
            name: "cookies",
            value: "accept",
          },
          {
            content: "Reject analytics cookies",
            type: "submit",
            name: "cookies",
            value: "reject",
          },
          { content: "View cookie preferences", href: "/cookie-preferences" },
        ],
      },
    ],
  },
};

export const AcceptedConfirmationBanner: Story = {
  args: {
    messages: [
      {
        content:
          "Your cookie preferences have been saved. You have accepted cookies.",
        role: "alert",
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
    ],
  },
};

export const RejectedConfirmationBanner: Story = {
  args: {
    messages: [
      {
        content:
          "Your cookie preferences have been saved. You have rejected cookies.",
        role: "alert",
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
    ],
  },
};

export const ClientSideImplementation: Story = {
  args: {
    messages: [
      {
        heading: "Cookies on this service",
        content: "We use cookies to help understand how users use our service.",
        actions: [
          {
            content: "Accept analytics cookies",
            type: "submit",
            name: "cookies",
            value: "accept",
          },
          {
            content: "Reject analytics cookies",
            type: "submit",
            name: "cookies",
            value: "reject",
          },
          { content: "View cookie preferences", href: "/cookie-preferences" },
        ],
      },
      {
        content:
          "Your cookie preferences have been saved. You have accepted cookies.",
        role: "alert",
        hidden: true,
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
      {
        content:
          "Your cookie preferences have been saved. You have rejected cookies.",
        role: "alert",
        hidden: true,
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
    ],
  },
};

export const WithHtml: Story = {
  args: {
    messages: [
      {
        heading: "Cookies on <span>my service</span>",
        content: (
          <>
            <p class="govuk-body">
              We use cookies in <span>our service</span>.
            </p>
            <p class="govuk-body">
              We’d like to use analytics cookies so we can understand how you
              use the Design System and make improvements.
            </p>
          </>
        ),
        actions: [
          {
            content: "Accept analytics cookies",
            type: "submit",
            name: "cookies",
            value: "accept",
          },
          {
            content: "Reject analytics cookies",
            type: "submit",
            name: "cookies",
            value: "reject",
          },
          { content: "View cookie preferences", href: "/cookie-preferences" },
        ],
      },
    ],
  },
};

export const HeadingHtml: Story = {
  args: {
    messages: [
      {
        heading: (
          <>
            Cookies on <span>my service</span>
          </>
        ),
      },
    ],
  },
};

export const HeadingHtmlAsText: Story = {
  args: { messages: [{ heading: "Cookies on <span>my service</span>" }] },
};

export const Html: Story = {
  args: {
    messages: [
      {
        content: (
          <p class="govuk-body">
            We use cookies in <span>our service</span>.
          </p>
        ),
      },
    ],
  },
};

export const Classes: Story = {
  args: { messages: [{ classes: "app-my-class" }] },
};

export const Attributes: Story = {
  args: { messages: [{ attributes: { "data-attribute": "my-value" } }] },
};

export const CustomAriaLabel: Story = {
  args: {
    ariaLabel: "Cookies on GOV.UK",
    messages: [{ content: "We use cookies on GOV.UK" }],
  },
};

export const Hidden: Story = { args: { messages: [{ hidden: true }] } };

export const HiddenFalse: Story = { args: { messages: [{ hidden: false }] } };

export const DefaultAction: Story = {
  args: { messages: [{ actions: [{ content: "This is a button" }] }] },
};

export const Link: Story = {
  args: {
    messages: [{ actions: [{ content: "This is a link", href: "/link" }] }],
  },
};

export const LinkWithFalseButtonOptions: Story = {
  args: {
    messages: [
      {
        actions: [
          {
            content: "This is a link",
            href: "/link",
            value: "cookies",
            name: "link",
          },
        ],
      },
    ],
  },
};

export const LinkAsAButton: Story = {
  args: {
    messages: [
      {
        actions: [{ content: "This is a link", href: "/link", type: "button" }],
      },
    ],
  },
};

export const Type: Story = {
  args: { messages: [{ actions: [{ content: "Button", type: "button" }] }] },
};

export const ButtonClasses: Story = {
  args: {
    messages: [
      {
        actions: [
          {
            content: "Button with custom classes",
            classes: "my-button-class app-button-class",
          },
        ],
      },
    ],
  },
};

export const ButtonAttributes: Story = {
  args: {
    messages: [
      {
        actions: [
          {
            content: "Button with attributes",
            attributes: { "data-button-attribute": "my-value" },
          },
        ],
      },
    ],
  },
};

export const LinkClasses: Story = {
  args: {
    messages: [
      {
        actions: [
          {
            content: "Link with custom classes",
            href: "/my-link",
            classes: "my-link-class app-link-class",
          },
        ],
      },
    ],
  },
};

export const LinkAttributes: Story = {
  args: {
    messages: [
      {
        actions: [
          {
            content: "Link with attributes",
            href: "/link",
            attributes: { "data-link-attribute": "my-value" },
          },
        ],
      },
    ],
  },
};

export const FullBannerHidden: Story = {
  args: {
    hidden: true,
    classes: "hide-cookie-banner",
    attributes: { "data-hide-cookie-banner": "true" },
    messages: [
      {
        heading: "Cookies on this service",
        content: "We use cookies to help understand how users use our service.",
        actions: [
          {
            content: "Accept analytics cookies",
            type: "submit",
            name: "cookies",
            value: "accept",
          },
          {
            content: "Reject analytics cookies",
            type: "submit",
            name: "cookies",
            value: "reject",
          },
          { content: "View cookie preferences", href: "/cookie-preferences" },
        ],
      },
      {
        content:
          "Your cookie preferences have been saved. You have accepted cookies.",
        role: "alert",
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
      {
        content:
          "Your cookie preferences have been saved. You have rejected cookies.",
        role: "alert",
        actions: [{ content: "Hide cookie message", type: "button" }],
      },
    ],
  },
};
