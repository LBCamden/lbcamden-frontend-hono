import { Meta, StoryObj } from "@storybook/html";
import { SummaryList } from "./SummaryList";
import { renderHtmlStory } from "../lib/story-utils";

type Story = StoryObj<typeof SummaryList>;

export default {
  component: renderHtmlStory(SummaryList),
} satisfies Meta<typeof SummaryList>;

export const Default: Story = {
  args: {
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
      },
    ],
  },
};

export const WithActions: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            { href: "#", content: "Edit", visuallyHidden: "name" },
            { href: "#", content: "Delete", visuallyHidden: "name" },
          ],
        },
      },
      {
        key: "Date of birth",
        value: "13/08/1980",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "date of birth" },
          ],
        },
      },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Edit",
              visuallyHidden: "contact information",
            },
            {
              href: "#",
              content: "Change",
              visuallyHidden: "contact information",
            },
          ],
        },
      },
    ],
  },
};

export const Translated: Story = {
  args: {
    rows: [
      {
        key: "Enw",
        value: "Firstname Lastname",
        actions: {
          items: [
            {
              href: "#",
              content: 'Golygu<span class="govuk-visually-hidden"> enw</span>',
              visuallyHidden: "",
            },
            {
              href: "#",
              content: 'Dileu<span class="govuk-visually-hidden"> enw</span>',
              visuallyHidden: "",
            },
          ],
        },
      },
      {
        key: "Dyddiad geni",
        value: "13/08/1980",
        actions: {
          items: [
            {
              href: "#",
              content:
                'Golygu<span class="govuk-visually-hidden"> dyddiad geni</span>',
              visuallyHidden: "",
            },
          ],
        },
      },
      {
        key: "Gwybodaeth cyswllt",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content:
                'Golygu<span class="govuk-visually-hidden"> gwybodaeth cyswllt</span>',
              visuallyHidden: "",
            },
          ],
        },
      },
    ],
  },
};

export const WithSomeActions: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            { href: "#", content: "Edit", visuallyHidden: "name" },
            { href: "#", content: "Delete", visuallyHidden: "name" },
          ],
        },
      },
      { key: "Date of birth", value: "13/08/1980" },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
      },
    ],
  },
};

export const WithNoFirstAction: Story = {
  args: {
    rows: [
      { key: "Name", value: "Sarah Philips" },
      {
        key: "Date of birth",
        value: "5 January 1978",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "date of birth" },
          ],
        },
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
        actions: {
          items: [{ href: "#", content: "Change", visuallyHidden: "address" }],
        },
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "contact details",
            },
          ],
        },
      },
      {
        key: "Licence period",
        value: (
          <>
            <p class="govuk-body">
              This is a longer paragraph of text provided by the user to provide
              additional information.
            </p>
            <p class="govuk-body">
              This is a second paragraph of text provided by the user.
            </p>
          </>
        ),
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "licence period" },
          ],
        },
      },
    ],
  },
};

export const NoBorder: Story = {
  args: {
    classes: "govuk-summary-list--no-border",
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
      },
    ],
  },
};

export const NoBorderOnLastRow: Story = {
  args: {
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
        classes: "govuk-summary-list__row--no-border",
      },
    ],
  },
};

export const OverriddenWidths: Story = {
  args: {
    rows: [
      {
        key: { classes: "govuk-!-width-one-half", content: "Name" },
        value: {
          classes: "govuk-!-width-one-quarter",
          content: "Firstname Lastname",
        },
        actions: {
          classes: "govuk-!-width-one-half",
          items: [
            { href: "#", content: "Edit", visuallyHidden: "name" },
            { href: "#", content: "Delete", visuallyHidden: "name" },
          ],
        },
      },
      {
        key: "Date of birth",
        value: "13/08/1980",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "date of birth" },
          ],
        },
      },
      {
        key: "Contact information",
        value: (
          <>
            <p class="govuk-body">email@email.com</p>
            <p class="govuk-body">
              Address line 1<br />
              Address line 2<br />
              Address line 3<br />
              Address line 4<br />
              Address line 5
            </p>
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Edit",
              visuallyHidden: "contact information",
            },
            {
              href: "#",
              content: "Change",
              visuallyHidden: "contact information",
            },
          ],
        },
      },
    ],
  },
};

export const CheckYourAnswers: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Sarah Philips",
        actions: {
          items: [{ href: "#", content: "Change", visuallyHidden: "name" }],
        },
      },
      {
        key: "Date of birth",
        value: "5 January 1978",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "date of birth" },
          ],
        },
      },
      {
        key: "Address",
        value: (
          <>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </>
        ),
        actions: {
          items: [{ href: "#", content: "Change", visuallyHidden: "address" }],
        },
      },
      {
        key: "Contact details",
        value: (
          <>
            07700 900457
            <br />
            sarah.phillips@example.com
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "contact details",
            },
          ],
        },
      },
      {
        key: "Previous application number",
        value: 502135326,
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "previous application number",
            },
          ],
        },
      },
      {
        key: "Licence type",
        value: "For personal use",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "licence type" },
          ],
        },
      },
      {
        key: "Home address",
        value: (
          <>
            <p class="govuk-body">
              72 Guild Street
              <br />
              London
              <br />
              SE23 6FH
            </p>
          </>
        ),
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "home address" },
          ],
        },
      },
      {
        key: "Licence period",
        value: (
          <>
            <p class="govuk-body">
              This is a longer paragraph of text provided by the user to provide
              additional information.
            </p>
            <p class="govuk-body">
              This is a second paragraph of text provided by the user.
            </p>
          </>
        ),
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "licence period" },
          ],
        },
      },
    ],
  },
};

export const Extreme: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value:
          "Barnaby Marmaduke Aloysius Benjy Cobweb Dartagnan Egbert Felix Gaspar Humbert Ignatius Jayden Kasper Leroy Maximilian Neddy Obiajulu Pepin Quilliam Rosencrantz Sexton Teddy Upwood Vivatma Wayland Xylon Yardley Zachary Usansky",
        actions: {
          items: [
            { href: "#", content: "Buy" },
            { href: "#", content: "Use" },
            { href: "#", content: "Break" },
            { href: "#", content: "Fix" },
            { href: "#", content: "Trash" },
            { href: "#", content: "Change" },
            { href: "#", content: "Mail" },
            { href: "#", content: "Upgrade" },
            { href: "#", content: "Charge" },
            { href: "#", content: "Point" },
            { href: "#", content: "Zoom" },
            { href: "#", content: "Press" },
            { href: "#", content: "Snap" },
            { href: "#", content: "Work" },
            { href: "#", content: "Quick" },
            { href: "#", content: "Erase" },
          ],
        },
      },
      {
        key: "Long website address",
        value: (
          <a
            class="govuk-link"
            href="https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
          >
            https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch
          </a>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "long website address",
            },
          ],
        },
      },
      {
        key: "Long email address",
        value: (
          <a
            class="govuk-link"
            href="mailto:webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com"
          >
            webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com
          </a>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "long email address",
            },
          ],
        },
      },
      {
        key: "No wrapping allowed",
        value: (
          <>
            <p class="govuk-body" style="white-space: nowrap;">
              michelle.longish.name@example.com
            </p>
          </>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "no wrapping allowed",
            },
          ],
        },
      },
      {
        key: "Pneumonoultramicroscopicsilicovolcanoconiosis",
        value: (
          <>
            <p class="govuk-body">
              Pneumonoultramicroscopicsilicovolcanoconiosis is a word coined by
              the president of the National Puzzlers’ League as a synonym for
              the disease known as silicosis. It is the longest word in the
              English language published in a dictionary, the Oxford English
              Dictionary, which defines it as "an artificial long word said to
              mean a lung disease caused by inhaling very fine ash and sand
              dust."
            </p>
            <p class="govuk-body">
              Silicosis is a form of occupational lung disease caused by
              inhalation of crystalline silica dust, and is marked by
              inflammation and scarring in the form of nodular lesions in the
              upper lobes of the lungs. It is a type of pneumoconiosis.
            </p>
          </>
        ),
        actions: {
          items: [
            { href: "#", content: "Write" },
            { href: "#", content: "Cut" },
            { href: "#", content: "Paste" },
            { href: "#", content: "Save" },
            { href: "#", content: "Load" },
            { href: "#", content: "Check" },
            { href: "#", content: "Quick" },
            { href: "#", content: "Rewrite" },
            { href: "#", content: "Plug" },
            { href: "#", content: "Play" },
            { href: "#", content: "Burn" },
            { href: "#", content: "Rip" },
            { href: "#", content: "Drag and drop" },
            { href: "#", content: "Zip" },
            { href: "#", content: "Unzip" },
            { href: "#", content: "Lock" },
            { href: "#", content: "Fill" },
            { href: "#", content: "Curl" },
            { href: "#", content: "Find" },
            { href: "#", content: "View" },
          ],
        },
      },
      {
        key: "Its vanished trees, the trees that had made way for Gatsby’s house, Pneumonoultramicroscopicsilicovolcanoconiosis had once pandered in whispers to the last and greatest of all human dreams; for a transitory enchanted moment man must have held his breath in the presence of this continent, compelled into an aesthetic contemplation he neither understood nor desired, face to face for the last time in history with something commensurate to his capacity for wonder.",
        value: "The Great Gatsby",
        actions: {
          items: [
            { href: "#", content: "Code" },
            { href: "#", content: "Jam" },
            { href: "#", content: "Unlock" },
            { href: "#", content: "Surf" },
            { href: "#", content: "Scroll" },
            { href: "#", content: "Pose" },
            { href: "#", content: "Click" },
            { href: "#", content: "Cross" },
            { href: "#", content: "Crack" },
            { href: "#", content: "Twitch" },
            { href: "#", content: "Update" },
            { href: "#", content: "Name" },
            { href: "#", content: "Read" },
            { href: "#", content: "Tune" },
            { href: "#", content: "Print" },
            { href: "#", content: "Scan" },
            { href: "#", content: "Send" },
            { href: "#", content: "Fax" },
            { href: "#", content: "Rename" },
            { href: "#", content: "Touch" },
            { href: "#", content: "Bring" },
            { href: "#", content: "Pay" },
            { href: "#", content: "Watch" },
            { href: "#", content: "Turn" },
            { href: "#", content: "Leave" },
            { href: "#", content: "Stop" },
            { href: "#", content: "Format" },
          ],
        },
      },
    ],
  },
};

export const AsASummaryCardWithATextHeader: Story = {
  args: {
    card: { title: "Undergraduate teaching assistant" },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const AsASummaryCardWithACustomHeaderLevel: Story = {
  args: {
    card: {
      title: { content: "Undergraduate teaching assistant", headingLevel: 3 },
    },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const AsASummaryCardWithAHtmlHeader: Story = {
  args: {
    card: { title: <em>Undergraduate teaching assistant</em> },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const AsASummaryCardWithActions: Story = {
  args: {
    card: {
      title: "Undergraduate teaching assistant",
      actions: {
        items: [
          { content: "Delete job history", href: "#" },
          { content: "Withdraw job history", href: "#" },
        ],
      },
    },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const AsASummaryCardWithActionsPlusSummaryListActions: Story = {
  args: {
    card: {
      title: "Undergraduate teaching assistant",
      actions: {
        items: [
          { content: "Delete job history", href: "#" },
          { content: "Withdraw job history", href: "#" },
        ],
      },
    },
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            { href: "#", content: "Edit", visuallyHidden: "name" },
            { href: "#", content: "Delete", visuallyHidden: "name" },
          ],
        },
      },
      {
        key: "Date of birth",
        value: "13/08/1980",
        actions: {
          items: [
            { href: "#", content: "Change", visuallyHidden: "date of birth" },
          ],
        },
      },
    ],
  },
};

export const AsASummaryCardExtreme: Story = {
  args: {
    card: {
      title: "Senior mid-level customer experience enhancement consultant",
      actions: {
        items: [
          { content: "Bop it", href: "#" },
          { content: "Twist it", href: "#" },
          { content: "Pull it", href: "#" },
          { content: "Flick it", href: "#" },
          { content: "Spin it", href: "#" },
          { content: "Shout it", href: "#" },
          { content: "Shake it", href: "#" },
        ],
      },
    },
    rows: [
      {
        key: "Name",
        value:
          "Barnaby Marmaduke Aloysius Benjy Cobweb Dartagnan Egbert Felix Gaspar Humbert Ignatius Jayden Kasper Leroy Maximilian Neddy Obiajulu Pepin Quilliam Rosencrantz Sexton Teddy Upwood Vivatma Wayland Xylon Yardley Zachary Usansky",
        actions: {
          items: [
            { href: "#", content: "Buy" },
            { href: "#", content: "Use" },
            { href: "#", content: "Break" },
            { href: "#", content: "Fix" },
            { href: "#", content: "Trash" },
            { href: "#", content: "Change" },
            { href: "#", content: "Mail" },
            { href: "#", content: "Upgrade" },
            { href: "#", content: "Charge" },
            { href: "#", content: "Point" },
            { href: "#", content: "Zoom" },
            { href: "#", content: "Press" },
            { href: "#", content: "Snap" },
            { href: "#", content: "Work" },
            { href: "#", content: "Quick" },
            { href: "#", content: "Erase" },
          ],
        },
      },
      {
        key: "Long website address",
        value: (
          <a
            class="govuk-link"
            href="https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
          >
            https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch
          </a>
        ),
        actions: {
          items: [
            {
              href: "#",
              content: "Change",
              visuallyHidden: "long website address",
            },
          ],
        },
      },
    ],
  },
};

export const Attributes: Story = {
  args: {
    rows: [{ key: "Name", value: "Firstname Lastname" }],
    attributes: {
      "data-attribute-1": "value-1",
      "data-attribute-2": "value-2",
    },
  },
};

export const WithFalsyValues: Story = {
  args: {
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      null,
      false,
      "",
      { key: "Name 2", value: "Firstname2 Lastname2" },
    ],
  },
};

export const KeyWithHtml: Story = {
  args: {
    rows: [{ key: <b>Name</b>, value: <strong>Firstname Lastname</strong> }],
  },
};

export const KeyWithClasses: Story = {
  args: {
    rows: [
      {
        key: { content: "Name", classes: "app-custom-class" },
        value: "Firstname Lastname",
      },
    ],
  },
};

export const ValueWithHtml: Story = {
  args: { rows: [{ key: "Name", value: <span>email@email.com</span> }] },
};

export const ActionsHref: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [{ href: "https://www.gov.uk", content: "Go to GOV.UK" }],
        },
      },
    ],
  },
};

export const ActionsWithHtml: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            {
              content: (
                <>
                  Edit<span class="visually-hidden"> name</span>
                </>
              ),
              href: "#",
            },
          ],
        },
      },
    ],
  },
};

export const ActionsWithClasses: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          classes: "app-custom-class",
          items: [{ content: "Edit", href: "/edit" }],
        },
      },
    ],
  },
};

export const ActionsWithAttributes: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            {
              content: "Edit",
              href: "#",
              attributes: {
                "data-test-attribute": "value",
                "data-test-attribute-2": "value-2",
              },
            },
          ],
        },
      },
    ],
  },
};

export const SingleActionWithAnchor: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: { items: [{ content: "First action", href: "#" }] },
      },
    ],
  },
};

export const ClassesOnItems: Story = {
  args: {
    rows: [
      {
        key: "Name",
        value: "Firstname Lastname",
        actions: {
          items: [
            {
              content: "Edit",
              href: "#",
              classes: "govuk-link--no-visited-state",
            },
          ],
        },
      },
    ],
  },
};

export const EmptyItemsArray: Story = {
  args: {
    rows: [
      { key: "Name", value: "Firstname Lastname", actions: { items: [] } },
    ],
  },
};

export const RowsWithClasses: Story = {
  args: {
    rows: [
      { key: "Name", value: "Firstname Lastname", classes: "app-custom-class" },
    ],
  },
};

export const SummaryCardWithCustomClasses: Story = {
  args: {
    card: { classes: "custom-class" },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const SummaryCardWithCustomAttributes: Story = {
  args: {
    card: {
      attributes: {
        "data-attribute-1": "value-1",
        "data-attribute-2": "value-2",
      },
    },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};

export const SummaryCardWithOnly1Action: Story = {
  args: {
    card: {
      title: "Undergraduate teaching assistant",
      actions: { items: [{ content: "My lonely action", href: "#" }] },
    },
    rows: [
      { key: "Name", value: "Firstname Lastname" },
      { key: "Date of birth", value: "13/08/1980" },
    ],
  },
};
