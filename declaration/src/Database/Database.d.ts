export declare class Database {
    protected dir: string;
    private path;
    constructor(dir: string, fileName: string);
    checkExists(path: string): boolean;
    readFile(path?: string): any;
    writeFile(data: any[], path?: string): void;
    private init;
}
