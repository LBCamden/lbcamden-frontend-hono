import { Meta, StoryObj } from "@storybook/html";
import { Details } from "./Details";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Details>;

export default {
  component: renderHtmlStory(Details),
} satisfies Meta<typeof Details>;

export const Default: Story = {
  args: {
    summary: "Help with nationality",
    children:
      "We need to know your nationality so we can work out which elections you’re entitled to vote in. If you can’t provide your nationality, you’ll have to send copies of identity documents through the post.",
  },
};

export const Expanded: Story = {
  args: {
    id: "help-with-nationality",
    summary: "Help with nationality",
    children:
      "We need to know your nationality so we can work out which elections you’re entitled to vote in. If you can’t provide your nationality, you’ll have to send copies of identity documents through the post.",
    open: true,
  },
};

export const WithHtml: Story = {
  args: {
    summary: "Where to find your National Insurance Number",
    children: (
      <>
        Your National Insurance number can be found on
        <ul>
          <li>your National Insurance card</li> <li>your payslip</li>{" "}
          <li>P60</li> <li>benefits information</li> <li>tax return</li>
        </ul>
      </>
    ),
  },
};

export const Id: Story = {
  args: {
    id: "my-details-element",
    summary: "Expand this section",
    children: "Here are some more details",
  },
};

export const HtmlAsText: Story = {
  args: {
    summary: "Expand this section",
    children: "More about the greater than symbol (>)",
  },
};

export const Html: Story = {
  args: {
    summary: "Expand this section",
    children: (
      <>
        More about <b>bold text</b>
      </>
    ),
  },
};

export const SummaryHtmlAsText: Story = {
  args: {
    summary: "The greater than symbol (>) is the best",
    children: "Here are some more details",
  },
};

export const SummaryHtml: Story = {
  args: {
    summary: "Use <b>bold text</b> sparingly",
    children: "Here are some more details",
  },
};

export const Classes: Story = {
  args: {
    classes: "some-additional-class",
    children: "Here are some more details",
    summary: "Expand me",
  },
};

export const Attributes: Story = {
  args: {
    children: "Here are some more details",
    summary: "Expand me",
    attributes: {
      "data-some-data-attribute": "i-love-data",
      "another-attribute": "foo",
    },
  },
};
