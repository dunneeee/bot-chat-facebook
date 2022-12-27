export declare class FbIDObj {
    code: number;
    id: string;
    err: string;
    constructor(code: number, id?: string, err?: string);
}
export declare class FbTools {
    private static apiGetID;
    static getIDWithLink(link: string): Promise<FbIDObj>;
}
