import { Meta, StoryObj } from "@storybook/html";
import { Pagination } from "./Pagination";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Pagination>;

export default {
  component: renderHtmlStory(Pagination),
} satisfies Meta<typeof Pagination>;

export const Default: Story = {
  args: {
    previous: { href: "/previous" },
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1" },
      { number: 2, href: "/page/2", current: true },
      { number: 3, href: "/page/3" },
    ],
  },
};

export const WithCustomNavigationLandmark: Story = {
  args: {
    previous: { href: "/previous" },
    next: { href: "/next" },
    landmarkLabel: "search",
    items: [
      { number: 1, href: "/page/1" },
      { number: 2, href: "/page/2", current: true },
      { number: 3, href: "/page/3" },
    ],
  },
};

export const WithCustomLinkAndItemText: Story = {
  args: {
    previous: { href: "/previous", content: "Previous page" },
    next: { href: "/next", content: "Next page" },
    items: [
      { number: "one", href: "/page/1" },
      { number: "two", href: "/page/2", current: true },
      { number: "three", href: "/page/3" },
    ],
  },
};

export const WithCustomAccessibleLabelsOnItemLinks: Story = {
  args: {
    previous: { href: "/previous" },
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1", visuallyHidden: "1st page" },
      {
        number: 2,
        href: "/page/2",
        current: true,
        visuallyHidden: "2nd page (you are currently on this page)",
      },
      { number: 3, href: "/page/3", visuallyHidden: "3rd page" },
    ],
  },
};

export const WithManyPages: Story = {
  args: {
    previous: { href: "/previous" },
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1" },
      { ellipsis: true },
      { number: 8, href: "/page/8" },
      { number: 9, href: "/page/9" },
      { number: 10, href: "/page/10", current: true },
      { number: 11, href: "/page/11" },
      { number: 12, href: "/page/12" },
      { ellipsis: true },
      { number: 40, href: "/page/40" },
    ],
  },
};

export const FirstPage: Story = {
  args: {
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1", current: true },
      { number: 2, href: "/page/2" },
      { number: 3, href: "/page/3" },
    ],
  },
};

export const LastPage: Story = {
  args: {
    previous: { href: "/previous" },
    items: [
      { number: 1, href: "/page/1" },
      { number: 2, href: "/page/2" },
      { number: 3, href: "/page/3", current: true },
    ],
  },
};

export const WithPrevAndNextOnly: Story = {
  args: { previous: { href: "/previous" }, next: { href: "/next" } },
};

export const WithPrevAndNextOnlyAndLabels: Story = {
  args: {
    previous: {
      content: "Previous page",
      label: "Paying VAT and duty",
      href: "/previous",
    },
    next: {
      content: "Next page",
      label: "Registering an imported vehicle",
      href: "/next",
    },
  },
};

export const WithPrevAndNextOnlyAndVeryLongLabels: Story = {
  args: {
    previous: {
      content: "Previous page",
      label:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      href: "/previous",
    },
    next: {
      content: "Next page",
      label:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      href: "/next",
    },
  },
};

export const WithPrevAndNextOnlyInADifferentLanguage: Story = {
  args: {
    previous: { content: "précédente", href: "/previous" },
    next: { content: "suivante", href: "/next" },
  },
};

export const WithPreviousOnly: Story = {
  args: { previous: { href: "/previous" } },
};

export const WithNextOnly: Story = { args: { next: { href: "/next" } } };

export const WithCustomClasses: Story = {
  args: {
    classes: "my-custom-class",
    previous: { href: "/previous" },
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1" },
      { number: 2, href: "/page/2", current: true },
      { number: 3, href: "/page/3" },
    ],
  },
};

export const WithCustomAttributes: Story = {
  args: {
    attributes: {
      "data-attribute-1": "value-1",
      "data-attribute-2": "value-2",
    },
    previous: { href: "/previous" },
    next: { href: "/next" },
    items: [
      { number: 1, href: "/page/1" },
      { number: 2, href: "/page/2", current: true },
      { number: 3, href: "/page/3" },
    ],
  },
};
