"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
    constructor(config) {
        this.name = config.name;
        this.prefix = config.prefix;
        this.adminID = config.adminID;
        this.devMode = config.devMode;
        this.line = config.line;
        this.icon = config.icon;
        this.pageHelp = config.pageHelp;
    }
    getHeader(header) {
        return this.line + header + this.line;
    }
    get getLine() {
        return this.line + this.icon + this.line;
    }
}
exports.Config = Config;
