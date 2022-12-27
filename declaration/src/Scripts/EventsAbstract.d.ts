import Scripts from ".";
import { Log } from "../../utils/Log";
import { Bot } from "../bot/Bot";
import { Api, Message } from "../facebook/FacebookInterface";
import { Config } from "./models/Events";
import { ScriptsModel } from "./models/Scripts";
export declare abstract class EventAbstract extends ScriptsModel {
    protected config: Config;
    protected args: string[];
    constructor(bot: Bot, scripts: Scripts, log: Log, config: Config);
    set setArgs(args: string[]);
    get getConfig(): Config;
    set setEvent(event: Message);
    set setApi(api: Api);
    abstract run(): Promise<void>;
}
