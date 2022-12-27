/// <reference types="node" />
import * as fs from "fs";
export declare class Tools {
    static readonly dir: string;
    constructor();
    static getStream(link: string): Promise<any>;
    static createLink(name: string): string;
    static removeFile(dir: string): void;
    static fileStream(link: string, extend: string): Promise<fs.ReadStream>;
    static pageCut<T>(arr: T[], size: number): T[][];
    static formatMoney(money: number): string;
}
