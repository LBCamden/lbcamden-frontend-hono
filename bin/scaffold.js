/**
 * Scaffolds a component and storybook file wrapping an upstream component.
 */

import { scaffoldComponents } from "../src/lib/upstream-utils";

const { lbcamden, govuk } = getOpts();

scaffoldComponents({
  dir: "node_modules/lbcamden-frontend/lbcamden/components",
  importSourcePrefix: "lbcamden-frontend/lbcamden/components",
  componentNamespace: "LBCamden",
  outPath: "src/components",
  only: [],
  ...lbcamden,
});

scaffoldComponents({
  dir: "node_modules/govuk-frontend/dist/govuk/components",
  importSourcePrefix: "govuk-frontend/dist/govuk/components",
  componentNamespace: "GovUK",
  outPath: "src/components",
  ...govuk,
});

function getOpts() {
  const [arg] = process.argv.slice(2);

  if (arg === "--all") {
    return {};
  }

  const [lib, component] = arg?.split("/") ?? [];
  if (!lib || !component) {
    throw Error(
      `Invalid argument. Either pass the name of a component eg: lbcamden/button or --all.`
    );
  }

  return {
    [lib]: { only: [component] },
  };
}
