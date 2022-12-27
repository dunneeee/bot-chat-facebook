import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
import { YtbTools } from "../supportTools/YtbTools";
export default class Ytb extends CmdAbstract {
    ytb: YtbTools;
    mapResult: Map<string, {
        title: string;
        link: string;
    }[]>;
    constructor(bot: Bot, scripts: Scripts);
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
}
