import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export default class Uid extends CmdAbstract {
    constructor(bot: Bot, scripts: Scripts);
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
