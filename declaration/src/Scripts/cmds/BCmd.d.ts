import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export default class Bcmd extends CmdAbstract {
    constructor(bot: Bot, s: Scripts);
    private banInGroup;
    private banUserInGroup;
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
