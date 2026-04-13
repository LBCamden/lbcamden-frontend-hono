#!/usr/bin/env node

import { cpSync, globSync, mkdirSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const srcDir = resolve(import.meta.dirname, "..", "dist");
const [destDir = "public"] = process.argv.slice(2);

mkdirSync(destDir, { recursive: true });
copyResource("lbcamden-frontend.*");
copyResource("assets");

function copyResource(glob) {
  const files = globSync(glob, { cwd: srcDir });

  for (const file of files) {
    cpSync(join(srcDir, file), join(destDir, basename(file)), {
      recursive: true,
    });
  }
}
