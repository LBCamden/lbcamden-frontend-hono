import { Meta, StoryObj } from "@storybook/html";
import { TaskList } from "./TaskList";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof TaskList>;

export default {
  component: renderHtmlStory(TaskList),
} satisfies Meta<typeof TaskList>;

export const Default: Story = {
  args: {
    items: [
      { title: "Company Directors", href: "#", status: "Completed" },
      {
        title: "Registered company details",
        href: "#",
        status: { tag: { content: "Incomplete", classes: "govuk-tag--blue" } },
      },
      {
        title: "Business plan",
        href: "#",
        status: { tag: { content: "Incomplete", classes: "govuk-tag--blue" } },
      },
    ],
  },
};

export const ExampleWith3States: Story = {
  args: {
    items: [
      { title: "Company Directors", href: "#", status: "Completed" },
      {
        title: "Registered company details",
        href: "#",
        status: {
          tag: { content: "Not started", classes: "govuk-tag--light-blue" },
        },
      },
      {
        title: "Business plan",
        href: "#",
        status: {
          tag: { content: "In progress", classes: "govuk-tag--blue" },
        },
      },
      {
        title: "Documentation",
        href: "#",
        status: {
          tag: { content: "Not started", classes: "govuk-tag--light-blue" },
        },
      },
    ],
  },
};

export const ExampleWithHintTextAndAdditionalStates: Story = {
  args: {
    items: [
      { title: "Company Directors", href: "#", status: "Completed" },
      {
        title: "Registered company details",
        href: "#",
        status: {
          tag: { content: "Not started", classes: "govuk-tag--light-blue" },
        },
      },
      {
        title: "Business plan",
        href: "#",
        hint: "Ensure the plan covers objectives, strategies, sales, marketing and financial forecasts.",
        status: { tag: { content: "Review", classes: "govuk-tag--pink" } },
      },
      {
        title: "Documentation",
        href: "#",
        status: {
          tag: { content: "In progress", classes: "govuk-tag--blue" },
        },
      },
      {
        title: "Charitable status",
        href: "#",
        status: { tag: { content: "Error", classes: "govuk-tag--red" } },
      },
      {
        title: "Payment",
        hint: "It will cost between £15 and £75",
        status: {
          content: "Cannot start yet",
          classes: "govuk-task-list__status--cannot-start-yet",
        },
      },
    ],
  },
};

export const ExampleWithAllPossibleColours: Story = {
  args: {
    items: [
      { title: "Task A", href: "#", status: "Text colour" },
      {
        title: "Task B",
        href: "#",
        status: {
          content: "Secondary text colour",
          classes: "govuk-task-list__status--cannot-start-yet",
        },
      },
      {
        title: "Task C",
        href: "#",
        status: { tag: { content: "Grey", classes: "govuk-tag--grey" } },
      },
      {
        title: "Task D",
        href: "#",
        status: { tag: { content: "Blue", classes: "govuk-tag--blue" } },
      },
      {
        title: "Task E",
        href: "#",
        status: {
          tag: { content: "Light blue", classes: "govuk-tag--light-blue" },
        },
      },
      {
        title: "Task F",
        href: "#",
        status: {
          tag: { content: "Turquoise", classes: "govuk-tag--turquoise" },
        },
      },
      {
        title: "Task G",
        href: "#",
        status: { tag: { content: "Green", classes: "govuk-tag--green" } },
      },
      {
        title: "Task H",
        href: "#",
        status: { tag: { content: "Purple", classes: "govuk-tag--purple" } },
      },
      {
        title: "Task I",
        href: "#",
        status: { tag: { content: "Pink", classes: "govuk-tag--pink" } },
      },
      {
        title: "Task J",
        href: "#",
        status: { tag: { content: "Red", classes: "govuk-tag--red" } },
      },
      {
        title: "Task K",
        href: "#",
        status: { tag: { content: "Orange", classes: "govuk-tag--orange" } },
      },
      {
        title: "Task L",
        href: "#",
        status: { tag: { content: "Yellow", classes: "govuk-tag--yellow" } },
      },
    ],
  },
};

export const ExampleWithVeryLongSingleWordTags: Story = {
  args: {
    items: [
      { title: "Company Directors", href: "#", status: "Completed" },
      {
        title: "Registered company details",
        href: "#",
        status: { tag: { content: "Incomplete", classes: "govuk-tag--blue" } },
      },
      {
        title: "A very very very long Business plan",
        href: "#",
        status: {
          tag: {
            content: "Thisisaverylongwaytosaythatsomethingisincomplete",
            classes: "govuk-tag--blue",
          },
        },
      },
    ],
  },
};

export const CustomClasses: Story = {
  args: {
    classes: "custom-class-on-component",
    items: [
      {
        title: { content: "A Link", classes: "custom-class-on-linked-title" },
        href: "#",
        classes: "custom-class-on-task",
        status: {
          classes: "custom-class-on-status",
          tag: { content: "Status", classes: "custom-class-on-tag" },
        },
      },
      {
        title: {
          content: "Not a link",
          classes: "custom-class-on-unlinked-title",
        },
        status: { tag: "Status" },
      },
    ],
  },
};

export const CustomAttributes: Story = {
  args: {
    attributes: { "data-custom-attribute": "custom-value" },
    items: [
      {
        title: "A Link",
        href: "#",
        status: {
          tag: {
            content: "Status",
            attributes: { "data-tag-attribute": "tag-value" },
          },
        },
      },
    ],
  },
};

export const CustomIdPrefix: Story = {
  args: {
    idPrefix: "my-custom-id",
    items: [
      {
        title: "A Link",
        hint: "Hint text",
        href: "#",
        status: { tag: "Status" },
      },
    ],
  },
};

export const HtmlPassedAsText: Story = {
  args: {
    idPrefix: "my-custom-id",
    items: [
      {
        title: <strong>Linked Title</strong>,
        hint: <strong>Hint</strong>,
        href: "#",
        status: <strong>Status</strong>,
      },
      {
        title: <strong>Unlinked Title</strong>,
        status: { tag: <strong>Tag</strong> },
      },
    ],
  },
};

export const Html: Story = {
  args: {
    idPrefix: "my-custom-id",
    items: [
      {
        title: <strong>Linked Title</strong>,
        hint: <strong>Hint</strong>,
        href: "#",
        status: <strong>Status</strong>,
      },
      {
        title: <strong>Unlinked Title</strong>,
        status: { tag: <strong>Tag</strong> },
      },
    ],
  },
};

export const WithEmptyValues: Story = {
  args: {
    items: [
      null,
      null,
      { title: "Task A", href: "#", status: "Completed" },
      false,
      "",
      { title: "Task B", href: "#", status: "Completed" },
    ],
  },
};
