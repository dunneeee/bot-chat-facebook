import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { EventAbstract } from "../EventsAbstract";
export default class LeaveEvent extends EventAbstract {
    constructor(bot: Bot, script: Scripts);
    run(): Promise<void>;
}
