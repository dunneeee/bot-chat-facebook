import { Api } from "./FacebookInterface";
export declare class Facebook {
    private path;
    private appState;
    constructor(appStatePath: string);
    private parseAppState;
    getApi(): Promise<Api>;
}
