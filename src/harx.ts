import filenamify from "filenamify";
import * as fs from "fs";
import type { Entry, Har } from "har-format";
import humanizeUrl from "humanize-url";
import * as path from "path";

export const getEntryContentAsBuffer = (entry: Entry): Buffer | undefined => {
  const content = entry.response.content;
  const text = content.text;
  // @ts-ignore
  if (text === undefined) return;
  if (content.encoding === "base64") {
    return Buffer.from(text, "base64");
  } else {
    return Buffer.from(text);
  }
};

export const convertEntryAsFilePathFormat = (entry: Entry, removeQueryString: boolean = false): string => {
  const requestURL = entry.request.url;
  const stripSchemaURL: string = humanizeUrl(removeQueryString ? requestURL.split("?")[0] : requestURL);
  const dirnames: string[] = stripSchemaURL.split("/").map((pathname) => {
    return filenamify(pathname);
  });
  const fileName = dirnames[dirnames.length - 1];
  if (
    fileName &&
    !fileName.includes(".html") &&
    entry.response.content.mimeType &&
    entry.response.content.mimeType.includes("text/html")
  ) {
    return dirnames.join("/") + "/index.html";
  }
  return dirnames.join("/");
};

export interface ExtractOptions {
  outputDir: string;
  verbose?: boolean;
  dryRun?: boolean;
  removeQueryString?: boolean;
}

export const extract = (harContent: Har, options: ExtractOptions) => {
  harContent.log.entries.forEach((entry) => {
    const buffer = getEntryContentAsBuffer(entry);
    if (!buffer) {
      return;
    }
    const outputPath = path.join(options.outputDir, convertEntryAsFilePathFormat(entry, options.removeQueryString));
    if (!options.dryRun) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }
    if (options.verbose) {
      console.log(outputPath);
    }
    if (!options.dryRun) {
      fs.writeFileSync(outputPath, buffer);
    }
  });
};
