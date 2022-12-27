import Database from "../Database";
import { Api, ApiError, Message } from "../facebook/FacebookInterface";
import Scripts from "../Scripts";
import { Bot } from "./Bot";
import { Process } from "./Process";
export declare class Handle {
    private api;
    private log;
    private script;
    private process;
    private db;
    private bot;
    constructor(api: Api, bot: Bot, db: Database, script: Scripts, process: Process);
    get getApi(): Api;
    logInfoBot(): void;
    logAuthor(): void;
    onListen(callback?: (err: ApiError, mess: Message) => any): Promise<void>;
    private listen;
}
