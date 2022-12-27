import Scripts from ".";
import { Bot } from "../bot/Bot";
export declare class Mod<T> {
    fileName: string;
    Mod: new (param: Bot, scripts: Scripts) => T;
    constructor(fileName: string, data: any);
}
export declare class Load<T> {
    private dir;
    private list;
    private log;
    constructor(dir: string);
    private loads;
    load(fileName: string): Mod<T>;
    get getList(): Mod<T>[];
}
