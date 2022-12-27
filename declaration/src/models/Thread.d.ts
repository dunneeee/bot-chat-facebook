import { CmdbanManager, Person, PersonInterface } from "./Person";
export interface ThreadSettingsInterface {
    prefix: string;
    joinNoti: string;
    leaveNoti: string;
    gifJoin: string;
    gifLeave: string;
}
export interface ThreadConfigInterface {
    id: string;
    bsend?: boolean;
    sim?: boolean;
}
export declare class ThreadConfig {
    private id;
    private bsend;
    private sim;
    constructor(config: ThreadConfigInterface);
    get getSim(): boolean;
    get getBSend(): boolean;
    set setSim(value: boolean);
    set setBSend(value: boolean);
    get getID(): string;
}
export declare class Settings {
    private prefix;
    private joinNoti;
    private leaveNoti;
    private gifJoin;
    private gifLeave;
    constructor(settings: ThreadSettingsInterface);
    get getGifJoin(): string;
    get getGifLeave(): string;
    set setGifJoin(value: string);
    set setGifLeave(value: string);
    get getPrefix(): string;
    set setPrefix(prefix: string);
    get getJoinNoti(): string;
    set setJoinNoti(value: string);
    get getLeaveNoti(): string;
    set setLeaveNoti(value: string);
}
export interface MemberInterface {
    id: string;
    exp: number;
    cmdBanManager: CmdbanManager;
}
export declare class Member {
    id: string;
    exp: number;
    private cmdBanManager;
    constructor(member: MemberInterface);
    get getCmdBanManager(): CmdbanManager;
}
export interface ThreadInterface {
    person: PersonInterface;
    settings: Settings;
    listMember: Member[];
}
export declare class Thread extends Person {
    private settings;
    private listMemmber;
    private log;
    constructor(thread: ThreadInterface);
    get getSettings(): Settings;
    set setSettings(settings: Settings);
    get getListMember(): Member[];
    set setListMember(value: Member[]);
    findMember(id: string): Member;
    addMember(member: Member): void;
    removeMember(memberID: string): void;
    get getInfo(): string;
}
