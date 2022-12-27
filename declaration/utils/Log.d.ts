import * as chalk from "chalk";
export declare class HeaderNoti {
    text: string;
    constructor(text: string);
    get success(): string;
    get error(): string;
    get warm(): string;
    get magenta(): string;
}
export declare class Log {
    private header;
    private pair;
    static devMode: boolean;
    constructor(header: string, pair?: string, devMode?: boolean);
    getHeader(): HeaderNoti;
    log(callback: (chalk?: chalk.Chalk, header?: HeaderNoti) => string): void;
    nLog(data: any): void;
}
