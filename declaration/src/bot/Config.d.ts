export interface ConfigInterface {
    name: string;
    prefix: string;
    adminID: string;
    devMode: boolean;
    line: string;
    icon: string;
    pageHelp: number;
}
export declare class Config {
    name: string;
    prefix: string;
    adminID: string;
    devMode: boolean;
    line: string;
    icon: string;
    pageHelp: number;
    constructor(config: ConfigInterface);
    getHeader(header: string): string;
    get getLine(): string;
}
