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
const CmdAbstract_1 = require("../CmdAbstract");
const Command_1 = require("../models/Command");
class Uid extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        const noKey = new Command_1.KeyHelp("@tag", "Tag người dùng cần lấy id", "uid @tag", "Không tag sẽ lấy uid của bạn!");
        super(bot, scripts, new Log_1.Log("Uid"), new Command_1.Config("uid", 0, 10, bot.getOwn, "Lấy uid người dùng!", [noKey]));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const listKey = Object.keys(this.event.mentions);
            if (!listKey.length) {
                this.bot.send(this.event.senderID, this.event.threadID, this.event.messageID);
                return;
            }
            this.bot.send(listKey.join("\n"), this.event.threadID, this.event.messageID);
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = Uid;
