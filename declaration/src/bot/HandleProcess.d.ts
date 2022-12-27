export declare class HandleProcess {
    cmdName: string;
    messageID: string;
    author: string;
    private data;
    constructor(cmdName: string, messageID: string, author?: string);
    setData<T>(data: T): void;
    getData<T>(): T;
}
export declare class HandleManager {
    private listProcess;
    constructor();
    add(process: HandleProcess): void;
    remove(messageID: string): void;
    get(messageID: string): HandleProcess;
}
