import { Bot } from "../../bot/Bot";
import { EventAbstract } from "../EventsAbstract";
import Scripts from "..";
export default class JoinEvent extends EventAbstract {
    constructor(bot: Bot, scripts: Scripts);
    run(): Promise<void>;
}
