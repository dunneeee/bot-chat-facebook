import { Banned } from "./Banned";
export interface PersonInterface {
    id: string;
    name: string;
    ban: Banned;
    cmdBanManager: CmdbanManager;
}
export interface CmdBanManagerInterface {
    list?: string[];
}
export declare class CmdbanManager {
    private list;
    constructor(obj: CmdBanManagerInterface);
    has(cmd: string): boolean;
    add(cmd: string): void;
    get getList(): string[];
    remove(cmd: string): void;
}
export declare class Person {
    protected id: string;
    protected name: string;
    protected ban: Banned;
    protected cmdBanManager: CmdbanManager;
    constructor(person: PersonInterface);
    get getID(): string;
    set setID(id: string);
    get getName(): string;
    set setName(name: string);
    get getban(): Banned;
    set setBan(ban: Banned);
    get getCmdBanManager(): CmdbanManager;
}
