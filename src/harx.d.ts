/// <reference types="node" />
import { Har, Entry } from "har-format";
export declare const getEntryContentAsBuffer: (entry: Entry) => Buffer | undefined;
export declare const convertEntryAsFilePathFormat: (entry: Entry, removeQueryString?: boolean) => string;
export interface ExtractOptions {
    outputDir: string;
    verbose?: boolean;
    dryRun?: boolean;
    removeQueryString?: boolean;
}
export declare const extract: (harContent: Har, options: ExtractOptions) => void;
