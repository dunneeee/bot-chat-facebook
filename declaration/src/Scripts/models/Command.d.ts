export declare class KeyHelp {
    key: string;
    des: string;
    use: string;
    note: string;
    constructor(key: string, des: string, use: string, note: string);
}
export declare class Config {
    name: string;
    permision: number;
    cooldown: number;
    author: string;
    help: KeyHelp[];
    des: string;
    isGroup: boolean;
    constructor(name: string, permision: number, cooldown: number, author: string, des: string, help: KeyHelp[], isGroup?: boolean);
    get getNotiPermision(): "Người dùng" | "Admin nhóm" | "Admin bot" | "Own bot" | "None";
    get getAllConfig(): string;
    get getSortConfig(): string;
}
