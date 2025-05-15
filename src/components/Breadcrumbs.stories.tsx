import { Meta, StoryObj } from "@storybook/html";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<BreadcrumbsProps>;

export default {
  component: renderHtmlStory(Breadcrumbs),
} satisfies Meta<BreadcrumbsProps>;

export const Default: Story = {
  args: {
    items: [
      { content: "Section", href: "/section" },
      { content: "Sub-section", href: "/section/sub-section" },
    ],
  },
};

export const WithOneLevel: Story = {
  args: { items: [{ content: "Section", href: "/section" }] },
};

export const WithMultipleLevels: Story = {
  args: {
    items: [
      { content: "Home", href: "/" },
      { content: "Section", href: "/section" },
      { content: "Sub-section", href: "/section/sub-section" },
      {
        content: "Sub Sub-section",
        href: "/section/sub-section/sub-sub-section",
      },
    ],
  },
};

export const WithoutTheHomeSection: Story = {
  args: {
    items: [
      { content: "Service Manual", href: "/service-manual" },
      { content: "Agile Delivery", href: "/service-manual/agile-delivery" },
    ],
  },
};

export const WithLastBreadcrumbAsCurrentPage: Story = {
  args: {
    items: [
      { content: "Home", href: "/" },
      {
        content: "Passports, travel and living abroad",
        href: "/browse/abroad",
      },
      { content: "Travel abroad" },
    ],
  },
};

export const WithCollapseOnMobile: Story = {
  args: {
    collapseOnMobile: true,
    items: [
      { content: "Home", href: "/" },
      { content: "Education, training and skills", href: "/education" },
      {
        content:
          "Special educational needs and disability (SEND) and high needs",
        href: "/education/special-educational-needs-and-disability-send-and-high-needs",
      },
    ],
  },
};

export const Inverse: Story = {
  args: {
    classes: "govuk-breadcrumbs--inverse",
    items: [
      { content: "Home", href: "/" },
      {
        content: "Passports, travel and living abroad",
        href: "/browse/abroad",
      },
      { content: "Travel abroad" },
    ],
  },
};

export const Classes: Story = {
  args: {
    classes: "app-breadcrumbs--custom-modifier",
    items: [{ content: "Home" }],
  },
};

export const Attributes: Story = {
  args: {
    attributes: { id: "my-navigation", "data-foo": "bar" },
    items: [{ content: "Home" }],
  },
};

export const ItemAttributes: Story = {
  args: {
    items: [
      {
        content: "Section 1",
        href: "/section",
        attributes: {
          "data-attribute": "my-attribute",
          "data-attribute-2": "my-attribute-2",
        },
      },
    ],
  },
};

export const HtmlAsText: Story = {
  args: {
    items: [
      { content: <span>Section 1</span>, href: "/section-1" },
      { content: <span>Section 2</span> },
    ],
  },
};

export const Html: Story = {
  args: {
    items: [
      { content: <em>Section 1</em>, href: "/section-1" },
      { content: <em>Section 2</em>, href: "/section-2" },
    ],
  },
};

export const CustomLabel: Story = {
  args: {
    labelText: "Briwsion bara",
    items: [
      { content: "Hafan", href: "/" },
      { content: "Sefydliadau", href: "/organisations" },
    ],
  },
};
