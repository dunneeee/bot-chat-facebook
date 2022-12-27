import Scripts from ".";
import { Log } from "../../utils/Log";
import { Bot } from "../bot/Bot";
import Database from "../Database";
import { Api, Message } from "../facebook/FacebookInterface";
import { Config } from "./models/Command";
import { ScriptsModel } from "./models/Scripts";
export declare class ParamsCmd {
    api: Api;
    scripts: Scripts;
    bot: Bot;
    db: Database;
    constructor(api: Api, bot: Bot, db: Database);
}
export declare abstract class CmdAbstract extends ScriptsModel {
    protected config: Config;
    protected args: string[];
    constructor(bot: Bot, script: Scripts, log: Log, config: Config);
    set setArgs(args: string[]);
    get getConfig(): Config;
    set setEvent(event: Message);
    set setApi(api: Api);
    abstract run(): Promise<void>;
    abstract reply(): Promise<void>;
    abstract reaction(): Promise<void>;
    abstract every(): Promise<void>;
    get getHelp(): string;
    auto(): Promise<void>;
}
