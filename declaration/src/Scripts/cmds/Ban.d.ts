import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { Person } from "../../models/Person";
import { CmdAbstract } from "../CmdAbstract";
export default class Ban extends CmdAbstract {
    private data;
    constructor(bot: Bot, scripts: Scripts);
    banUser(arr: string[]): string[];
    getText(personList: Person[]): {
        arr: any[];
        text: string;
    };
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
