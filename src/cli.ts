#!/usr/bin/env node

import * as fs from "node:fs";
import * as path from "node:path";
import { extract, ExtractOptions } from "./harx";
import meow from "meow";
import type { Har, Entry } from "har-format";

const cli: any = meow(
  `
    Usage
      $ harx <file> [options]

    Options
      --output, -o 		Output directory
      --remove-query-string, -r Remove query string from file path
      --dry-run, -d 		Perform a dry run with no lasting changes
      --verbose 		Print more info

    Examples
      $ harx ./net.har --output /path/to/output
      $ harx ./net.har --verbose -r -o ./output
`,
  {
    flags: {
      output: {
        type: "string",
        alias: "o",
      },
      removeQueryString: {
        type: "boolean",
        alias: "r",
        default: false,
      },
      verbose: {
        type: "boolean",
        default: true,
      },
      dryRun: {
        type: "boolean",
        alias: "d",
        default: false,
      },
    },
    autoHelp: true,
    importMeta: import.meta,
  }
);

const harFilePath: string = cli.input[0];
if (!harFilePath) cli.showHelp();
try {
  const harContent: Har = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), harFilePath), "utf-8"));
  extract(harContent, {
    verbose: cli.flags.verbose,
    dryRun: cli.flags.dryRun,
    removeQueryString: cli.flags.removeQueryString,
    outputDir: cli.flags.output,
  });
} catch (error: any) {
  console.error(error);
  cli.showHelp();
}

export type { Har, Entry, ExtractOptions };
