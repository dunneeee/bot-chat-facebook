import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export default class Kick extends CmdAbstract {
    constructor(bot: Bot, script: Scripts);
    kick(arrID: string[]): void;
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
