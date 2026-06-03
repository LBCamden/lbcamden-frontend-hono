import { Meta, StoryObj } from "@storybook/html";
import { ServiceNavigation } from "./ServiceNavigation";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof ServiceNavigation>;

export default {
  component: renderHtmlStory(ServiceNavigation),
} satisfies Meta<typeof ServiceNavigation>;

export const Default: Story = {
  args: {
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};

export const WithNavigationWithACurrentItem: Story = {
  args: {
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2", current: true },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};

export const WithLargeNavigation: Story = {
  args: {
    navigation: [
      { href: "#/browse/benefits", content: "Benefits" },
      {
        href: "#/browse/births-deaths-marriages",
        content: "Births, deaths, marriages and care",
      },
      { href: "#/browse/business", content: "Business and self-employed" },
      {
        href: "#/browse/childcare-parenting",
        content: "Childcare and parenting",
      },
      {
        href: "#/browse/citizenship",
        content: "Citizenship and living in the UK",
      },
      { href: "#/browse/justice", content: "Crime, justice and the law" },
      { href: "#/browse/disabilities", content: "Disabled people" },
      { href: "#/browse/driving", content: "Driving and transport" },
      { href: "#/browse/education", content: "Education and learning" },
      { href: "#/browse/employing-people", content: "Employing people" },
      {
        href: "#/browse/environment-countryside",
        content: "Environment and countryside",
      },
      {
        href: "#/browse/housing-local-services",
        content: "Housing and local services",
      },
      { href: "#/browse/tax", content: "Money and tax" },
      {
        href: "#/browse/abroad",
        content: "Passports, travel and living abroad",
      },
      { href: "#/browse/visas-immigration", content: "Visas and immigration" },
      { href: "#/browse/working", content: "Working, jobs and pensions" },
    ],
  },
};

export const WithHtmlNavigationItems: Story = {
  args: {
    navigation: [
      { href: "#/1", content: <em>Navigation item 1</em> },
      { href: "#/2", content: <em>Navigation item 2</em> },
      { href: "#/3", content: <em>Navigation item 3</em> },
    ],
  },
};

export const WithNonLinkNavigationItems: Story = {
  args: {
    navigation: [
      { content: "Navigation item 1" },
      { content: <em>Navigation item 2</em> },
      { content: "Navigation item 3" },
    ],
  },
};

export const WithServiceName: Story = { args: { serviceName: "Service name" } };

export const WithServiceLink: Story = {
  args: { serviceName: "Service name", serviceUrl: "#/" },
};

export const WithLongServiceName: Story = {
  args: {
    serviceName:
      "Apply to receive a rare holofoil Charizard Pokémon card from the King",
    serviceUrl: "#/",
  },
};

export const WithServiceNameAndNavigation: Story = {
  args: {
    serviceName: "Apply for a juggling license",
    serviceUrl: "#/",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2", active: true },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};

export const Inverse: Story = {
  args: {
    classes: "govuk-service-navigation--inverse",
    serviceName: "Apply for a juggling license",
    serviceUrl: "#/",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2", active: true },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};

export const WithCollapseNavigationOnMobileSetToFalse: Story = {
  args: {
    serviceName: "Apply for a juggling license",
    serviceUrl: "#/",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2", active: true },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
    collapseNavigationOnMobile: false,
  },
};

export const WithASingleNavigationItem: Story = {
  args: {
    serviceName: "Apply for a juggling license",
    serviceUrl: "#/",
    navigation: [{ href: "#/1", content: "Log out" }],
  },
};

export const WithASingleNavigationItemAndCollapseNavigationOnMobileSetToTrue: Story =
  {
    args: {
      serviceName: "Apply for a juggling license",
      serviceUrl: "#/",
      navigation: [{ href: "#/1", content: "Log out" }],
      collapseNavigationOnMobile: true,
    },
  };

export const WithNoOptionsSet: Story = { args: {} };

export const Attributes: Story = {
  args: {
    serviceName: "Service name",
    attributes: { "data-foo": "bar", "data-pika": "chu" },
  },
};

export const Classes: Story = {
  args: { serviceName: "Service name", classes: "app-my-curious-custom-class" },
};

export const WithCustomAriaLabel: Story = {
  args: { serviceName: "Service name", ariaLabel: "Service name and nav" },
};

export const WithCustomNavigationToggleText: Story = {
  args: {
    menuButton: "Enter the NavZone",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithCustomNavigationToggleLabel: Story = {
  args: {
    menuButtonLabel: "Enter the NavZone",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithIdenticalNavigationToggleTextAndLabel: Story = {
  args: {
    menuButton: "Enter the NavZone",
    menuButtonLabel: "Enter the NavZone",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithCustomNavigationLabel: Story = {
  args: {
    navigationLabel: "Main navigation",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithCustomNavigationToggleTextAndNavigationLabel: Story = {
  args: {
    menuButton: "Enter the NavZone",
    navigationLabel: "The NavZone",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithCustomNavigationClasses: Story = {
  args: {
    navigationClasses: "app-my-neat-navigation-class",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithCustomNavigationId: Story = {
  args: {
    navigationId: "main-nav",
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithNavigationHavingEmptyValues: Story = {
  args: {
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      null,
      false,
      "",
      null,
      { href: "#/2", content: "Navigation item 2" },
    ],
  },
};

export const WithNavigationHavingOnlyEmptyValues: Story = {
  args: { navigation: [null, false, null, ""] },
};

export const WithNavigationBeingAnEmptyArray: Story = {
  args: { navigation: [] },
};

export const WithNavigationWithAnActiveItem: Story = {
  args: {
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2", active: true },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};

export const WithSlottedContent: Story = {
  args: {
    slots: {
      start: <div>[start]</div>,
      end: <div>[end]</div>,
      navigationStart: <li>[navigation start]</li>,
      navigationEnd: <li>[navigation end]</li>,
    },
  },
};

export const Rebrand: Story = {
  args: {
    navigation: [
      { href: "#/1", content: "Navigation item 1" },
      { href: "#/2", content: "Navigation item 2" },
      { href: "#/3", content: "Navigation item 3" },
      { href: "#/4", content: "Navigation item 4" },
    ],
  },
};
