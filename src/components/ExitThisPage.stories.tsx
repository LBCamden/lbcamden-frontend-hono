import { Meta, StoryObj } from "@storybook/html";
import { ExitThisPage } from "./ExitThisPage";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof ExitThisPage>;

export default {
  component: renderHtmlStory(ExitThisPage),
} satisfies Meta<typeof ExitThisPage>;

export const Default: Story = {
  args: {
    redirectUrl: "/full-page-examples/announcements",
    id: null,
    classes: null,
    attributes: {},
  },
};

export const Translated: Story = {
  args: {
    children: "Gadael y dudalen",
    activated: "Tudalen ymadael",
    timedOut: "Wedi'i amseru",
    pressTwoMoreTimes: "Pwyswch 'Shift' 2 gwaith arall",
    pressOneMoreTime: "Pwyswch 'Shift' 1 mwy o amser",
  },
};

export const Testing: Story = {
  args: {
    children: "Exit this test",
    redirectUrl: "https://www.test.co.uk",
    id: "test-id",
    classes: "test-class",
    attributes: { "test-attribute": true },
  },
};

export const TestingHtml: Story = {
  args: {
    children: (
      <>
        Exit <em>this</em> test
      </>
    ),
  },
};
