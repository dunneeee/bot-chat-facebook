import { LogEventType } from "../../facebook/FacebookInterface";
export declare class Config {
    name: string;
    logType: LogEventType[];
    constructor(name: string, logType: LogEventType[]);
}
