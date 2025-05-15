import { Meta, StoryObj } from "@storybook/html";
import { NotificationBanner } from "./NotificationBanner";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof NotificationBanner>;

export default {
  component: renderHtmlStory(NotificationBanner),
} satisfies Meta<typeof NotificationBanner>;

export const Default: Story = {
  args: { children: "This publication was withdrawn on 7 March 2014." },
};

export const ParagraphAsHtmlHeading: Story = {
  args: {
    children: (
      <p class="govuk-notification-banner__heading">
        You have 9 days to send a response.
      </p>
    ),
  },
};

export const WithTextAsHtml: Story = {
  args: {
    children: (
      <>
        <h3 class="govuk-notification-banner__heading">
          This publication was withdrawn on 7 March 2014
        </h3>
        <p class="govuk-body">
          Archived and replaced by the{" "}
          <a href="#" class="govuk-notification-banner__link">
            new planning guidance
          </a>{" "}
          launched 6 March 2014 on an external website
        </p>
      </>
    ),
  },
};

export const WithTypeAsSuccess: Story = {
  args: { type: "success", children: "Email sent to example@email.com" },
};

export const SuccessWithCustomHtml: Story = {
  args: {
    type: "success",
    children: (
      <>
        <h3 class="govuk-notification-banner__heading">4 files uploaded</h3>
        <ul class="govuk-!-margin-0 govuk-list">
          <li>
            <a href="link-1" class="govuk-notification-banner__link">
              government-strategy.pdf
            </a>
          </li>
          <li>
            <a href="link-2" class="govuk-notification-banner__link">
              government-strategy-v1.pdf
            </a>
          </li>
        </ul>
      </>
    ),
  },
};

export const WithAList: Story = {
  args: {
    children: (
      <>
        <h3 class="govuk-notification-banner__heading">4 files uploaded</h3>
        <ul class="govuk-list govuk-list--bullet govuk-!-margin-bottom-0">
          <li>
            <a href="#" class="govuk-notification-banner__link">
              government-strategy.pdf
            </a>
          </li>
          <li>
            <a href="#" class="govuk-notification-banner__link">
              government-strategy-v2.pdf
            </a>
          </li>
          <li>
            <a href="#" class="govuk-notification-banner__link">
              government-strategy-v3-FINAL.pdf
            </a>
          </li>
          <li>
            <a href="#" class="govuk-notification-banner__link">
              government-strategy-v4-FINAL-v2.pdf
            </a>
          </li>
        </ul>
      </>
    ),
  },
};

export const WithLongHeading: Story = {
  args: {
    children:
      "This publication was withdrawn on 7 March 2014, before being sent in, sent back, queried, lost, found, subjected to public inquiry, lost again, and finally buried in soft peat for three months and recycled as firelighters.",
  },
};

export const WithLotsOfContent: Story = {
  args: {
    children: (
      <>
        <h3 class="govuk-notification-banner__heading">
          Check if you need to apply the reverse charge to this application
        </h3>
        <p class="govuk-body">
          You will have to apply the{" "}
          <a href="#" class="govuk-notification-banner__link">
            reverse charge
          </a>{" "}
          if the applicant supplies any of these services:
        </p>
        <ul class="govuk-list govuk-list--bullet govuk-list--spaced">
          <li>
            constructing, altering, repairing, extending, demolishing or
            dismantling buildings or structures (whether permanent or not),
            including offshore installation services
          </li>
          <li>
            constructing, altering, repairing, extending, demolishing of any
            works forming, or planned to form, part of the land, including (in
            particular) walls, roadworks, power lines, electronic communications
            equipment, aircraft runways, railways, inland waterways, docks and
            harbours
          </li>
        </ul>
      </>
    ),
  },
};

export const AutoFocusDisabledWithTypeAsSuccess: Story = {
  args: {
    type: "success",
    disableAutoFocus: true,
    children: "Email sent to example@email.com",
  },
};

export const AutoFocusExplicitlyEnabledWithTypeAsSuccess: Story = {
  args: {
    type: "success",
    disableAutoFocus: false,
    children: "Email sent to example@email.com",
  },
};

export const RoleAlertOverriddenToRoleRegionWithTypeAsSuccess: Story = {
  args: {
    type: "success",
    role: "region",
    children: "Email sent to example@email.com",
  },
};

export const CustomTabindex: Story = {
  args: {
    type: "success",
    children: "Email sent to example@email.com",
    attributes: { tabindex: 2 },
  },
};

export const CustomTitle: Story = {
  args: {
    title: "Important information",
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const TitleAsHtml: Story = {
  args: {
    title: <span>Important information</span>,
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const TitleHtmlAsText: Story = {
  args: {
    title: <span>Important information</span>,
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const CustomTitleHeadingLevel: Story = {
  args: {
    titleHeadingLevel: 3,
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const CustomTitleId: Story = {
  args: {
    titleId: "my-id",
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const CustomTitleIdWithTypeAsSuccess: Story = {
  args: {
    type: "success",
    titleId: "my-id",
    children: "Email sent to example@email.com",
  },
};

export const CustomText: Story = {
  args: { children: "This publication was withdrawn on 7 March 2014." },
};

export const HtmlAsText: Story = {
  args: {
    children: <span>This publication was withdrawn on 7 March 2014.</span>,
  },
};

export const CustomRole: Story = {
  args: {
    role: "banner",
    children: "This publication was withdrawn on 7 March 2014.",
  },
};

export const Classes: Story = {
  args: {
    children: "This publication was withdrawn on 7 March 2014.",
    classes: "app-my-class",
  },
};

export const Attributes: Story = {
  args: {
    children: "This publication was withdrawn on 7 March 2014.",
    attributes: { "my-attribute": "value" },
  },
};

export const WithInvalidType: Story = {
  args: {
    type: "some-type",
    children: "This publication was withdrawn on 7 March 2014.",
  },
};
