import { Meta, StoryObj } from "@storybook/html";
import { Panel } from "./Panel";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof Panel>;

export default {
  component: renderHtmlStory(Panel),
} satisfies Meta<typeof Panel>;

export const Default: Story = {
  args: {
    title: "Application complete",
    children: "Your reference number: HDJ2123F",
  },
};

export const CustomHeadingLevel: Story = {
  args: {
    title: "Application complete",
    headingLevel: 2,
    children: "Your reference number: HDJ2123F",
  },
};

export const TitleHtmlAsText: Story = {
  args: {
    title: "Application <strong>not</strong> complete",
    children: "Please complete form 1",
  },
};

export const TitleHtml: Story = {
  args: {
    title: (
      <>
        Application <strong>not</strong> complete
      </>
    ),
    children: (
      <>
        Please complete <strong>form 1</strong>
      </>
    ),
  },
};

export const BodyHtmlAsText: Story = {
  args: {
    title: "Application complete",
    children: "Your reference number<br><strong>HDJ2123F</strong>",
  },
};

export const BodyHtml: Story = {
  args: {
    title: "Application complete",
    children: (
      <>
        Your reference number
        <br />
        <strong>HDJ2123F</strong>
      </>
    ),
  },
};

export const Classes: Story = {
  args: {
    title: "Application complete",
    children: "Your reference number is HDJ2123F",
    classes: "extra-class one-more-class",
  },
};

export const Attributes: Story = {
  args: {
    title: "Application complete",
    children: "Your reference number is HDJ2123F",
    attributes: { "first-attribute": "foo", "second-attribute": "bar" },
  },
};

export const TitleWithNoBodyText: Story = {
  args: { title: "Application complete" },
};
