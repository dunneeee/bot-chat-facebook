import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { Message } from "../../facebook/FacebookInterface";
import { CmdAbstract } from "../CmdAbstract";
declare class DataSend {
    private list;
    private timeDelete;
    private stopTime;
    constructor(arr?: Message[]);
    add(mess: Message): void;
    remove(messageID: string): void;
    get(messageID: string): Message;
    stopReset(): void;
}
export default class BSend extends CmdAbstract {
    data: Map<string, DataSend>;
    constructor(b: Bot, s: Scripts);
    run(): Promise<void>;
    reaction(): Promise<void>;
    reply(): Promise<void>;
    every(): Promise<void>;
    auto(): Promise<void>;
}
export {};
