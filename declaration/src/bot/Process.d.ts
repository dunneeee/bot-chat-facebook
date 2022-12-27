import Database from "../Database";
import { Api, Message, ThreadInfo, User as Userfb } from "../facebook/FacebookInterface";
import Scripts from "../Scripts";
import { CmdAbstract } from "../scripts/CmdAbstract";
import { Bot } from "./Bot";
import { HandleManager } from "./HandleProcess";
export declare class Process {
    private api;
    private db;
    private scripts;
    private bot;
    private event;
    private args;
    private log;
    private coolDown;
    private upExp;
    handleReaction: HandleManager;
    handleReply: HandleManager;
    constructor(api: Api, db: Database, scripts: Scripts, bot: Bot);
    checkUpdate(): Promise<void>;
    getUserInfo(id: string): Promise<Userfb>;
    getThreadInfo(id: string): Promise<ThreadInfo>;
    set setEvent(event: Message);
    getUseCmd(): {
        status: number;
        cmd: CmdAbstract | 0;
    };
    getReplyCmd(): CmdAbstract;
    getReactionCmd(): CmdAbstract;
    onUpExp(): void;
    checkCmdCanUseInGroup(cmd: CmdAbstract): boolean;
    checkPermision(cmd: CmdAbstract, send?: boolean): Promise<boolean>;
    checkCoolDown(cmd: CmdAbstract): boolean;
    checkAndCreateUser(userID: string): Promise<void>;
    checkAndCreateThread(threadID: string): Promise<void>;
    checkAndCreateMemberOfThread(memberID: string, threadID: string): void;
}
