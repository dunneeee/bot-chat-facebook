"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../../../utils/Log");
const HandleProcess_1 = require("../../bot/HandleProcess");
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
class Example extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const log = new Log_1.Log("Example");
        const key1 = new Command_1.KeyHelp("key1", "Mô tả về key", "cách dùng lệnh với key", "ghi chú gì đó");
        const key2 = new Command_1.KeyHelp("key1", "Mô tả về key", "cách dùng lệnh với key", "ghi chú gì đó");
        const listKey = [key1, key2];
        const config = new Command_1.Config("example", 0, 10, "Lê Thế Dũng", "Ví dụ về cấu trúc lệnh", listKey);
        super(bot, scripts, log, config);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.bot.send("Hello world", this.event.threadID, this.event.messageID);
            const handle = new HandleProcess_1.HandleProcess(this.config.name, info.messageID);
            this.bot.getProcess.handleReply.add(handle);
            this.bot.getProcess.handleReaction.add(handle);
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () {
            const handle = this.bot.getProcess.handleReply.get(this.event.messageReply.messageID);
            this.bot.getProcess.handleReply.remove(handle.messageID);
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const handle = this.bot.getProcess.handleReaction.get(this.event.messageID);
            this.bot.getProcess.handleReaction.remove(handle.messageID);
        });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    auto() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Example;
