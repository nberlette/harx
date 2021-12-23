import { describe } from "mocha";
import * as path from "path";
import { extract } from "harx";
import * as fs from "fs";
import * as assert from "assert";
import * as glob from "glob";
import * as del from "del";
const outputDir = path.join(__dirname, "output");
describe("har-extractor", () => {
  afterEach(() => {
    return del([outputDir]);
  });
  it("should extract to output directory", () => {
    const inputFile = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures/en.wikipedia.org.har"), "utf-8"));
    extract(inputFile, {
      outputDir,
    });
    const outputFiles = glob.sync(`${outputDir}/**`, {
      nodir: true,
    });
    assert.ok(outputFiles.length > 0);
  });
  it("should respect --dry-run", () => {
    const inputFile = JSON.parse(fs.readFileSync(path.join(__dirname, "fixtures/en.wikipedia.org.har"), "utf-8"));
    extract(inputFile, {
      outputDir: outputDir,
      dryRun: true,
    });
    const outputFiles = glob.sync(`${outputDir}/**`, {
      nodir: true,
    });
    assert.ok(outputFiles.length === 0);
  });
});
