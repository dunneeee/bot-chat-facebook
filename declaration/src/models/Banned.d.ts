export interface BannedInterface {
    banned: boolean;
    reason: string;
}
export declare class Banned {
    private banned;
    private reason;
    constructor(ban: BannedInterface);
    get getBanned(): boolean;
    set setBanned(ban: boolean);
    get getReason(): string;
    set setReason(reason: string);
}
