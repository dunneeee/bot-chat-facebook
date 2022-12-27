import Scripts from "..";
import { Log } from "../../../utils/Log";
import { Bot } from "../../bot/Bot";
import Database from "../../Database";
import { Api, Message } from "../../facebook/FacebookInterface";
export declare class ScriptsModel {
    api: Api;
    log: Log;
    event: Message;
    scripts: Scripts;
    db: Database;
    bot: Bot;
    constructor(bot: Bot, scripts: Scripts, log: Log);
}
