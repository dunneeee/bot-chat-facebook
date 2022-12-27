import { CmdAbstract } from "./CmdAbstract";
import { Bot } from "../bot/Bot";
import { EventAbstract } from "./EventsAbstract";
import { LogEventType } from "../facebook/FacebookInterface";
export default class {
    private mapCmd;
    private loadCmd;
    private listCmd;
    private mapEvent;
    private loadEvent;
    private listEvent;
    constructor(params: Bot);
    findCmd(name: string): CmdAbstract;
    hasCmd(name: string): boolean;
    getCmd<T extends CmdAbstract>(name: string): T;
    get getMapCmd(): Map<string, CmdAbstract>;
    get getListCmd(): CmdAbstract[];
    findEvent(event: LogEventType): EventAbstract;
    get getEventList(): EventAbstract[];
    get getEventMap(): Map<string, EventAbstract>;
}
