export declare class UserCool {
    id: string;
    time: number;
    constructor(id: string, time: number);
    get leftime(): number;
}
export declare class CmdCoolDown {
    private name;
    private listUser;
    constructor(name: string, listUser: UserCool[]);
    get getName(): string;
    add(user: UserCool): void;
    remove(userID: string): void;
    get(userID: string): UserCool;
}
export declare class CoolDown {
    private list;
    constructor();
    has(cmdName: string): boolean;
    add(cmdCoolDown: CmdCoolDown): void;
    remove(cmdName: string): void;
    get(cmdName: string): CmdCoolDown;
}
