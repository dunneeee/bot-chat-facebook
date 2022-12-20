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
class Unsend extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        super(bot, scripts, new Log_1.Log("unsend"), new Command_1.Config("unsend", 0, 10, bot.getOwn, "Gỡ tin nhắn bot gửi đi", []));
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.event.messageReply) {
                this.bot.send(`Reply tin nhắn cần gỡ`, this.event.threadID, this.event.messageID);
                return;
            }
            if (this.event.messageReply.senderID != this.bot.botID) {
                this.bot.send(`Không thể gỡ tin nhắn của người khác`, this.event.threadID, this.event.messageID);
                return;
            }
            this.bot.unsend(this.event.messageReply.messageID);
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
exports.default = Unsend;
