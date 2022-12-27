import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export declare class HandleAdminCmdStatus {
    private id;
    private message;
    private code;
    constructor(id: string, code: number, message?: string);
    get getID(): string;
    get getmessage(): string;
    get getCode(): number;
    set setmessage(message: string);
    set setCode(code: number);
}
export default class SetAdmin extends CmdAbstract {
    constructor(bot: Bot, script: Scripts);
    setAdminUsers(userIDList: string[], status: boolean): HandleAdminCmdStatus[];
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
