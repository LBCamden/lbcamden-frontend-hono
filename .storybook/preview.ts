import "./init"
import "lbcamden-frontend/dist/govuk-frontend.min.js"
import "lbcamden-frontend/dist/lbcamden-frontend-1.0.2.min.js"
import "lbcamden-frontend/dist/lbcamden-frontend-1.0.2.min.css"

import type { Preview } from '@storybook/html'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;