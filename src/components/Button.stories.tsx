import { Meta, StoryObj } from "@storybook/html";
import { Button, ButtonProps } from "./Button";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<ButtonProps>;

export default {
  component: renderHtmlStory(Button),
} satisfies Meta<ButtonProps>;

export const Default: Story = { args: { children: "Save and continue" } };

export const LargeButton: Story = {
  args: { children: "Save and continue", largeButton: true },
};

export const Disabled: Story = {
  args: { children: "Disabled button", disabled: true },
};

export const Link: Story = { args: { children: "Link button", href: "/" } };

export const LinkDisabled: Story = {
  args: { children: "Disabled link button", href: "/", disabled: true },
};

export const Start: Story = {
  args: { children: "Start now button", isStartButton: true },
};

export const StartLink: Story = {
  args: { children: "Start now link button", href: "/", isStartButton: true },
};

export const Input: Story = {
  args: { element: "input", name: "start-now", children: "Start now" },
};

export const InputDisabled: Story = {
  args: {
    element: "input",
    children: "Explicit input button disabled",
    disabled: true,
  },
};

export const PreventDoubleClick: Story = {
  args: { children: "Submit", preventDoubleClick: true },
};

export const WithActiveState: Story = {
  args: { name: "active", children: "Active", classes: ":active" },
};

export const WithHoverState: Story = {
  args: { name: "hover", children: "Hovered", classes: ":hover" },
};

export const WithFocusState: Story = {
  args: { name: "focus", children: "Focussed", classes: ":focus" },
};

export const Secondary: Story = {
  args: {
    name: "secondary",
    children: "Secondary button",
    classes: "lbcamden-button--secondary",
  },
};

export const SecondaryDisabled: Story = {
  args: {
    name: "secondary",
    children: "Secondary button disabled",
    classes: "lbcamden-button--secondary",
    disabled: true,
  },
};

export const SecondaryLink: Story = {
  args: {
    name: "secondary",
    children: "Secondary button",
    href: "/",
    classes: "lbcamden-button--secondary",
  },
};

export const Warning: Story = {
  args: {
    name: "Warning",
    children: "Warning button",
    classes: "lbcamden-button--warning",
  },
};

export const WarningDisabled: Story = {
  args: {
    name: "warning",
    children: "Warning button disabled",
    classes: "lbcamden-button--warning",
    disabled: true,
  },
};

export const WarningLink: Story = {
  args: {
    name: "Warning",
    children: "Warning button",
    href: "/",
    classes: "lbcamden-button--warning",
  },
};

export const Attributes: Story = {
  args: {
    element: "button",
    children: "Submit",
    attributes: {
      "aria-controls": "example-id",
      "data-tracking-dimension": 123,
    },
  },
};

export const LinkAttributes: Story = {
  args: {
    element: "a",
    children: "Submit",
    attributes: {
      "aria-controls": "example-id",
      "data-tracking-dimension": 123,
    },
  },
};

export const InputAttributes: Story = {
  args: {
    element: "input",
    children: "Submit",
    attributes: {
      "aria-controls": "example-id",
      "data-tracking-dimension": 123,
    },
  },
};

export const Classes: Story = {
  args: {
    children: "Submit",
    element: "button",
    classes: "app-button--custom-modifier",
  },
};

export const LinkClasses: Story = {
  args: {
    children: "Submit",
    element: "a",
    classes: "app-button--custom-modifier",
  },
};

export const InputClasses: Story = {
  args: {
    children: "Submit",
    element: "input",
    classes: "app-button--custom-modifier",
  },
};

export const Name: Story = {
  args: { children: "Submit", element: "button", name: "start-now" },
};

export const Type: Story = {
  args: { children: "Submit", element: "button", type: "button" },
};

export const InputType: Story = {
  args: { children: "Submit", element: "input", type: "button" },
};

export const ExplicitLink: Story = {
  args: { element: "a", href: "/", children: "Continue" },
};

export const NoHref: Story = { args: { children: "Submit", element: "a" } };

export const Value: Story = {
  args: { children: "Submit", element: "button", value: "start" },
};

export const Html: Story = {
  args: {
    children: (
      <>
        Start <em>now</em>
      </>
    ),
    element: "button",
  },
};

export const NoData: Story = { args: {} };
