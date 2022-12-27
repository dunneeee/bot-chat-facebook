import Scripts from "..";
import { Bot } from "../../bot/Bot";
import { CmdAbstract } from "../CmdAbstract";
export default class Sim extends CmdAbstract {
    private listThread;
    constructor(bot: Bot, scripts: Scripts);
    swichSim(status: boolean): {
        status: number;
        mess: string;
    };
    run(): Promise<void>;
    reply(): Promise<void>;
    reaction(): Promise<void>;
    every(): Promise<void>;
    auto(): Promise<void>;
}
