/// <reference types="node" />
import * as yt from "youtube-search";
import * as fs from "fs";
export declare class YtbTools {
    static apiKey: string;
    static dir: string;
    private log;
    constructor();
    createLink(key: string): string;
    search(keyword: string): Promise<{
        results?: yt.YouTubeSearchResults[];
        pageInfo: yt.YouTubeSearchPageResults;
    }>;
    private removeFile;
    dowload(link: string): Promise<fs.ReadStream>;
}
