import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export default class Help extends CmdAbstract {
    constructor(bot: Bot, scripts: Scripts);
    sendPage(page: number): void;
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
