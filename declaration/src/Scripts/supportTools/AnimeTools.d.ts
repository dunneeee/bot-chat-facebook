/// <reference types="node" />
import * as fs from "fs";
export declare class AnimeTools {
    private apiKey;
    private link;
    private log;
    constructor(apiKey?: string);
    getHentai(): Promise<fs.ReadStream>;
}
