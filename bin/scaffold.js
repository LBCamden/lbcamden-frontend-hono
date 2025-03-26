import { scaffoldComponents } from "../src/lib/upstream-utils";

scaffoldComponents({
  dir: "node_modules/lbcamden-frontend/lbcamden/components",
  importSourcePrefix: "lbcamden-frontend/lbcamden/components",
  componentNamespace: "LBCamden",
  outPath: "src/components",
  only: ["button", "header", "footer"],
});

scaffoldComponents({
  dir: "node_modules/govuk-frontend/dist/govuk/components",
  importSourcePrefix: "govuk-frontend/dist/govuk/components",
  componentNamespace: "GovUK",
  outPath: "src/components",
  only: [],
});
