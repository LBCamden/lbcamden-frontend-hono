import { Meta, StoryObj } from "@storybook/html";
import { Accordion, AccordionProps } from "./Accordion";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<AccordionProps>;

export default {
  component: renderHtmlStory(Accordion),
} satisfies Meta<AccordionProps>;

export const Default: Story = {
  args: {
    id: "default-example",
    items: [
      {
        heading: "Section A",
        content:
          "We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.",
      },
      {
        heading: "Section B",
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const WithAdditionalDescriptions: Story = {
  args: {
    id: "with-descriptions",
    items: [
      {
        heading: "Test",
        summary: "Additional description",
        content: (
          <>
            <p class="govuk-body">
              We need to know your nationality so we can work out which
              elections you’re entitled to vote in. If you cannot provide your
              nationality, you’ll have to send copies of identity documents
              through the post.
            </p>
            <ul class="govuk-list govuk-list--bullet">
              <li>Example item 1</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Test 2",
        summary: (
          <span class="govuk-!-font-weight-regular">
            Additional description (wrapped in span)
          </span>
        ),
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const WithLongContentAndDescription: Story = {
  args: {
    id: "with-long-content-and-description",
    items: [
      {
        heading:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis tortor porttitor.",
        summary:
          "Etiam diam dui, tempus ut pharetra in, aliquet non dui. Nunc pulvinar maximus tortor, ac finibus augue congue vitae. Donec sed cursus lorem.",
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 1</li>
          </ul>
        ),
      },
      {
        heading:
          "Praesent faucibus leo feugiat libero pharetra lacinia. Aliquam aliquet ante vitae mollis vestibulum.",
        summary: (
          <span class="govuk-!-font-weight-regular">
            Maecenas nec <abbr>est</abbr> sapien. Etiam varius luctus mauris non
            porttitor.{" "}
          </span>
        ),
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const WithOneSectionOpen: Story = {
  args: {
    id: "one-section-open-example",
    items: [
      {
        heading: "Section A",
        expanded: true,
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 1</li>
          </ul>
        ),
      },
      {
        heading: "Section B",
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const WithAllSectionsAlreadyOpen: Story = {
  args: {
    id: "all-sections-open-example",
    items: [
      {
        heading: "Section A",
        expanded: true,
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 1</li>
          </ul>
        ),
      },
      {
        heading: "Section B",
        expanded: true,
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const WithFocusableElementsInside: Story = {
  args: {
    id: "with-focusable-elements",
    items: [
      {
        heading: "Section A",
        content: (
          <a class="govuk-link" href="#">
            Link A
          </a>
        ),
      },
      {
        heading: "Section B",
        content: (
          <a class="govuk-link" href="#">
            Link B
          </a>
        ),
      },
    ],
  },
};

export const WithTranslations: Story = {
  args: {
    id: "with-translations",
    hideAllSectionsText: "Collapse all sections",
    showAllSectionsText: "Expand all sections",
    hideSectionText: "Collapse",
    hideSectionAriaLabelText: "Collapse this section",
    showSectionText: "Expand",
    showSectionAriaLabelText: "Expand this section",
    items: [
      {
        heading: "Section A",
        content:
          "We need to know your nationality so we can work out which elections you’re entitled to vote in. If you cannot provide your nationality, you’ll have to send copies of identity documents through the post.",
      },
      {
        heading: "Section B",
        content: (
          <ul class="govuk-list govuk-list--bullet">
            <li>Example item 2</li>
          </ul>
        ),
      },
    ],
  },
};

export const Classes: Story = {
  args: {
    id: "accordion-classes",
    classes: "myClass",
    items: [{ heading: "Section A", content: "Some content" }],
  },
};

export const Attributes: Story = {
  args: {
    id: "accordion-attributes",
    attributes: { "data-attribute": "value" },
    items: [{ heading: "Section A", content: "Some content" }],
  },
};

export const CustomHeadingLevel: Story = {
  args: {
    id: "accordion-heading",
    headingLevel: 3,
    items: [{ heading: "Section A", content: "Some content" }],
  },
};

export const HeadingHtml: Story = {
  args: {
    id: "accordion-heading-html",
    items: [
      {
        heading: <span class="myClass">Section A</span>,
        content: "Some content",
      },
    ],
  },
};

export const WithFalsyValues: Story = {
  args: {
    id: "accordion-falsy",
    items: [
      { heading: "Section A", content: "Some content" },
      false,
      "",
      null,
      { heading: "Section B", content: "Some content" },
    ],
  },
};

export const WithRememberExpandedOff: Story = {
  args: {
    id: "accordion-remember-expanded-off",
    rememberExpanded: false,
    items: [{ heading: "Section A", content: "Some content" }],
  },
};
