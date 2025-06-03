import { Meta, StoryObj } from "@storybook/html";
import { Footer } from "./Footer";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Footer>;

export default {
  component: renderHtmlStory(Footer),
} satisfies Meta<typeof Footer>;

export const Default: Story = { args: {} };

export const WithCustomHtmlContentLicenceAndCopyrightNotice: Story = {
  args: {
    contentLicence: (
      <>
        Mae’r holl gynnwys ar gael dan{" "}
        <a
          class="govuk-footer__link"
          href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/"
          rel="license"
        >
          Drwydded y Llywodraeth Agored v3.0
        </a>
        , ac eithrio lle nodir yn wahanol
      </>
    ),
    copyright: <span>Hawlfraint y Goron</span>,
  },
};

export const WithCustomTextContentLicenceAndCopyrightNotice: Story = {
  args: {
    contentLicence:
      "Mae’r holl gynnwys ar gael dan Drwydded y Llywodraeth Agored v3.0, ac eithrio lle nodir yn wahanol",
    copyright: "© Hawlfraint y Goron",
  },
};

export const WithMeta: Story = {
  args: {
    meta: {
      visuallyHiddenTitle: "Items",
      items: [
        { href: "#1", content: "Item 1" },
        { href: "#2", content: "Item 2" },
        { href: "#3", content: "Item 3" },
      ],
    },
  },
};

export const WithMetaLinksAndMetaContent: Story = {
  args: {
    meta: {
      items: [
        { href: "#1", content: "Bibendum Ornare" },
        { href: "#2", content: "Nullam" },
        { href: "#3", content: "Tortor Fringilla" },
        { href: "#4", content: "Tellus" },
        { href: "#5", content: "Egestas Nullam" },
        { href: "#6", content: "Euismod Etiam" },
        { href: "#7", content: "Fusce Sollicitudin" },
        { href: "#8", content: "Ligula Nullam Ultricies" },
      ],
      content:
        'Built by the <a href="#" class="govuk-footer__link">Department of Magical Law Enforcement</a>',
    },
  },
};

export const WithCustomMeta: Story = {
  args: { meta: "GOV.UK Prototype Kit v7.0.1" },
};

export const WithDefaultWidthNavigationOneColumn: Story = {
  args: {
    navigation: [
      {
        title: "Navigation section",
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
    ],
  },
};

export const WithDefaultWidthNavigationTwoColumns: Story = {
  args: {
    navigation: [
      {
        title: "Navigation section",
        columns: 2,
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
    ],
  },
};

export const WithNavigation: Story = {
  args: {
    navigation: [
      {
        title: "Two column list",
        width: "two-thirds",
        columns: 2,
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
      {
        title: "Single column list",
        width: "one-third",
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
        ],
      },
    ],
  },
};

export const FullGdsExample: Story = {
  args: {
    navigation: [
      {
        title: "Coronavirus (COVID-19)",
        width: "two-thirds",
        items: [
          {
            href: "/coronavirus",
            content: "Coronavirus (COVID-19): guidance and support",
          },
        ],
      },
      {
        title: "Brexit",
        width: "one-third",
        items: [{ href: "/brexit", content: "Check what you need to do" }],
      },
      {
        title: "Services and information",
        width: "two-thirds",
        columns: 2,
        items: [
          { href: "/browse/benefits", content: "Benefits" },
          {
            href: "/browse/births-deaths-marriages",
            content: "Births, deaths, marriages and care",
          },
          { href: "/browse/business", content: "Business and self-employed" },
          {
            href: "/browse/childcare-parenting",
            content: "Childcare and parenting",
          },
          {
            href: "/browse/citizenship",
            content: "Citizenship and living in the UK",
          },
          { href: "/browse/justice", content: "Crime, justice and the law" },
          { href: "/browse/disabilities", content: "Disabled people" },
          { href: "/browse/driving", content: "Driving and transport" },
          { href: "/browse/education", content: "Education and learning" },
          { href: "/browse/employing-people", content: "Employing people" },
          {
            href: "/browse/environment-countryside",
            content: "Environment and countryside",
          },
          {
            href: "/browse/housing-local-services",
            content: "Housing and local services",
          },
          { href: "/browse/tax", content: "Money and tax" },
          {
            href: "/browse/abroad",
            content: "Passports, travel and living abroad",
          },
          {
            href: "/browse/visas-immigration",
            content: "Visas and immigration",
          },
          { href: "/browse/working", content: "Working, jobs and pensions" },
        ],
      },
      {
        title: "Departments and policy",
        width: "one-third",
        items: [
          {
            href: "/government/how-government-works",
            content: "How government works",
          },
          { href: "/government/organisations", content: "Departments" },
          { href: "/world", content: "Worldwide" },
          { href: "/government/policies", content: "Policies" },
          { href: "/government/publications", content: "Publications" },
          { href: "/government/announcements", content: "Announcements" },
        ],
      },
    ],
    meta: {
      items: [
        { href: "/help", content: "Help" },
        { href: "/help/cookies", content: "Cookies" },
        { href: "/contact", content: "Contact" },
        { href: "/help/terms-conditions", content: "Terms and conditions" },
        { href: "/cymraeg", content: "Rhestr o Wasanaethau Cymraeg" },
      ],
      content:
        'Built by the <a class="govuk-footer__link" href="#">Government Digital Service</a>',
    },
  },
};

export const ThreeEqualColumns: Story = {
  args: {
    navigation: [
      {
        title: "Single column list 1",
        width: "one-third",
        columns: 1,
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
      {
        title: "Single column list 2",
        width: "one-third",
        columns: 1,
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
      {
        title: "Single column list 3",
        width: "one-third",
        columns: 1,
        items: [
          { href: "#1", content: "Navigation item 1" },
          { href: "#2", content: "Navigation item 2" },
          { href: "#3", content: "Navigation item 3" },
          { href: "#4", content: "Navigation item 4" },
          { href: "#5", content: "Navigation item 5" },
          { href: "#6", content: "Navigation item 6" },
        ],
      },
    ],
  },
};

export const Attributes: Story = {
  args: {
    attributes: {
      "data-test-attribute": "value",
      "data-test-attribute-2": "value-2",
    },
  },
};

export const Classes: Story = {
  args: { classes: "app-footer--custom-modifier" },
};

export const WithContainerClasses: Story = {
  args: { containerClasses: "app-width-container" },
};

export const WithHtmlPassedAsTextContent: Story = {
  args: {
    contentLicence:
      'Mae’r holl gynnwys ar gael dan <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license">Drwydded y Llywodraeth Agored v3.0</a>, ac eithrio lle nodir yn wahanol',
    copyright: <span>Hawlfraint y Goron</span>,
  },
};

export const WithEmptyMeta: Story = { args: { meta: {} } };

export const WithEmptyMetaItems: Story = { args: { meta: { items: [] } } };

export const MetaHtmlAsText: Story = {
  args: { meta: "GOV.UK Prototype Kit <strong>v7.0.1</strong>" },
};

export const WithMetaHtml: Story = {
  args: {
    meta: (
      <>
        GOV.UK Prototype Kit <strong>v7.0.1</strong>
      </>
    ),
  },
};

export const WithMetaItemAttributes: Story = {
  args: {
    meta: {
      items: [
        {
          href: "#1",
          content: "meta item 1",
          attributes: {
            "data-attribute": "my-attribute",
            "data-attribute-2": "my-attribute-2",
          },
        },
      ],
    },
  },
};

export const WithEmptyNavigation: Story = { args: { navigation: [] } };

export const WithNavigationItemAttributes: Story = {
  args: {
    navigation: [
      {
        title: "Single column list 1",
        items: [
          {
            href: "#1",
            content: "Navigation item 1",
            attributes: {
              "data-attribute": "my-attribute",
              "data-attribute-2": "my-attribute-2",
            },
          },
        ],
      },
    ],
  },
};
