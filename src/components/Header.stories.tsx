import { Meta, StoryObj } from "@storybook/html";
 import { Header } from "./Header";
 import { renderHtmlStory } from "../lib/story-utils";

 type Story = StoryObj<typeof Header>;

 export default {
   component: renderHtmlStory(Header),
 } satisfies Meta<typeof Header>;

 export const Default: Story = {"args":{"searchItems":[{"href":"#1","children":"Popular search 1"},{"href":"#2","children":"Popular search 2"},{"href":"#3","children":"Popular search 3"}],"navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2"},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}]}};

 export const NestedNavigation: Story = {"args":{"searchItems":[{"href":"#1","children":"Popular search 1"},{"href":"#2","children":"Popular search 2"},{"href":"#3","children":"Popular search 3"}],"navigation":[{"href":"#1","children":"Navigation item 1","description":"Find information and services","subItems":[{"href":"#1-1","children":"Sub Item 1"},{"href":"#1-2","children":"Sub Item 2"},{"href":"#1-3","children":"Sub Item 3"},{"href":"#1-4","children":"Sub Item 4"},{"href":"#1-5","children":"Sub Item 5"},{"href":"#1-6","children":"Sub Item 6"},{"href":"#1-7","children":"Sub Item 7"},{"href":"#1-8","children":"Sub Item 8"}]},{"href":"#2","children":"Navigation item 2","description":"Search for a department and find out what the council is doing","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}]}};

 export const NestedNavigationWithThreeColumns: Story = {"args":{"searchItems":[{"href":"#1","children":"Popular search 1"},{"href":"#2","children":"Popular search 2"},{"href":"#3","children":"Popular search 3"}],"navigation":[{"href":"#1","children":"Navigation item 1","subItems":[{"href":"#1-1","children":"Sub Item 1"},{"href":"#1-2","children":"Sub Item 2"},{"href":"#1-3","children":"Sub Item 3"},{"href":"#1-4","children":"Sub Item 4"},{"href":"#1-5","children":"Sub Item 5"},{"href":"#1-6","children":"Sub Item 6"},{"href":"#1-7","children":"Sub Item 7"},{"href":"#1-8","children":"Sub Item 8"}]},{"href":"#2","children":"Navigation item 2","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}]}};

 export const WithMixedLevelsOfNavigation: Story = {"args":{"navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2","description":"Search for a department and find out what the council is doing","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}]}};

 export const WithMixedLevelSiteNavigation: Story = {"args":{"navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2","description":"Search for a department and find out what the council is doing","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}],"siteNavigation":{"title":"Family Hubs","search":false,"homepageUrl":"#","navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2","subItems":[{"href":"#1-1","children":"Sub Item 1"},{"href":"#1-2","children":"Sub Item 2"},{"href":"#1-3","children":"Sub Item 3"},{"href":"#1-4","children":"Sub Item 4"}]}]}}};

 export const WithSiteNavigation: Story = {"args":{"navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2"},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}],"siteNavigation":{"title":"Family Hubs","search":false,"homepageUrl":"#","navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2"}]}}};

 export const WithNoSearch: Story = {"args":{"search":false,"navigation":[{"href":"#1","children":"Navigation item 1","description":"Find information and services","subItems":[{"href":"#1-1","children":"Sub Item 1"},{"href":"#1-2","children":"Sub Item 2"},{"href":"#1-3","children":"Sub Item 3"},{"href":"#1-4","children":"Sub Item 4"},{"href":"#1-5","children":"Sub Item 5"},{"href":"#1-6","children":"Sub Item 6"},{"href":"#1-7","children":"Sub Item 7"},{"href":"#1-8","children":"Sub Item 8"}]},{"href":"#2","children":"Navigation item 2","description":"Search for a department and find out what the council is doing","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]}]}};

 export const WithNoNavigation: Story = {"args":{"navigation":[],"searchItems":[]}};

 export const WithPhasebanner: Story = {"args":{"phaseBanner":{"tag":"beta","children":"This is a new service – your <a class=\"govuk-link\" href=\"#\">feedback</a> will help us to improve it."}}};

 export const WithNoNavigationOrSearch: Story = {"args":{"navigation":[],"search":false}};

 export const WithDeathOfANotablePerson: Story = {"args":{"emergencyBanner":<section role="banner" class="lbcamden-emergency-banner lbcamden-emergency-banner--notable-death lbcamden-emergency-banner--homepage ">
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds lbcamden-emergency-banner__content">
        <h2 class="">His Royal Highness Henry VIII</h2>

          <p> 1491–1547</p>

          <a href="https://www.gov.uk/">
            Override Link Text
          </a>
      </div>
    </div>
  </div>
</section>
,"navigation":[{"href":"#1","children":"Navigation item 1","description":"Find information and services","subItems":[{"href":"#1-1","children":"Sub Item 1"},{"href":"#1-2","children":"Sub Item 2"},{"href":"#1-3","children":"Sub Item 3"},{"href":"#1-4","children":"Sub Item 4"},{"href":"#1-5","children":"Sub Item 5"},{"href":"#1-6","children":"Sub Item 6"},{"href":"#1-7","children":"Sub Item 7"},{"href":"#1-8","children":"Sub Item 8"}]},{"href":"#2","children":"Navigation item 2","description":"Search for a department and find out what the council is doing","subItems":[{"href":"#1-1","children":"Sub Item 1","description":"Description of service"},{"href":"#1-2","children":"Sub Item 2","description":"Description of service"},{"href":"#1-3","children":"Sub Item 3","description":"Description of service"},{"href":"#1-4","children":"Sub Item 4","description":"Description of service"}]},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}]}};

 export const WithDeathOfANotablePersonAndNoNavigation: Story = {"args":{"emergencyBanner":<section role="banner" class="lbcamden-emergency-banner lbcamden-emergency-banner--notable-death lbcamden-emergency-banner--homepage ">
  <div class="govuk-width-container">
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds lbcamden-emergency-banner__content">
        <h2 class="">His Royal Highness Henry VIII</h2>

          <p> 1491–1547</p>

          <a href="https://www.gov.uk/">
            Override Link Text
          </a>
      </div>
    </div>
  </div>
</section>
,"navigation":[],"search":false}};

 export const WithSearchThatHasCustomisedParameters: Story = {"args":{"navigation":[{"href":"#1","children":"Navigation item 1"},{"href":"#2","children":"Navigation item 2"},{"href":"#3","children":"Sign in / Register","classes":"lbcamden-header__navigation-item-link--sign-in"}],"search":{"action":"https://www.camden.gov.uk/search?q=","name":"find","additionalParameters":{"highlighting":true}}}};

 export const Classes: Story = {"args":{"classes":"app-header--custom-modifier"}};

 export const Attributes: Story = {"args":{"attributes":{"data-test-attribute":"value","data-test-attribute-2":"value-2"}}};

