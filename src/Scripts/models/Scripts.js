"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptsModel = void 0;
class ScriptsModel {
    constructor(bot, scripts, log) {
        this.bot = bot;
        this.api = bot.getApi;
        this.scripts = scripts;
        this.log = log;
        this.db = bot.getDB;
    }
}
exports.ScriptsModel = ScriptsModel;
