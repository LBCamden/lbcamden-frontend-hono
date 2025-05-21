/**
 * Generates interface files for upstream nunjucks components, written to `src/upstream`
 */

import { genInterfaces } from "../src/lib/upstream-utils";

genInterfaces({
  dir: "node_modules/lbcamden-frontend/lbcamden/components",
  importSourcePrefix: "lbcamden-frontend/lbcamden/components",
  componentNamespace: "LBCamden",
  outPath: "src/upstream/lbcamden.ts",
});

genInterfaces({
  dir: "node_modules/govuk-frontend/dist/govuk/components",
  importSourcePrefix: "govuk-frontend/dist/govuk/components",
  componentNamespace: "GovUK",
  outPath: "src/upstream/govuk.ts",
});
