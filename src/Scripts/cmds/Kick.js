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
class Kick extends CmdAbstract_1.CmdAbstract {
    constructor(bot, script) {
        const key1 = new Command_1.KeyHelp("@tag", "Tag người dùng cần", "kick [@tag]", "Có thể tag nhiều người dùng, bot cần quyền quản trị viên nhóm để thực hiện lệnh này!");
        super(bot, script, new Log_1.Log("kick"), new Command_1.Config("kick", 1, 10, bot.getOwn, "Kick người dùng ra khỏi nhóm", [key1]));
    }
    kick(arrID) {
        const thread = this.db.findThread(this.event.threadID);
        if (arrID.length == 0)
            return;
        const handle = (index) => __awaiter(this, void 0, void 0, function* () {
            if (!arrID[index])
                return;
            const isRmove = yield this.bot.kickUser(arrID[index], this.event.threadID);
            if (!isRmove) {
                this.bot.send(`Có lỗi khi kick người dùng có phải bot chưa phải là quản trị viên nhóm?`, this.event.threadID, this.event.messageID);
                return;
            }
            thread.removeMember(arrID[index]);
            this.db.saveThread();
            setTimeout(() => {
                handle(index + 1);
            }, 2000);
        });
        handle(0);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const listID = Object.keys(this.event.mentions);
            if (listID.length == 0) {
                this.bot.send(`Vui lòng tag những người cần kick`, this.event.threadID, this.event.messageID);
            }
            else {
                const isAdminBox = yield this.bot.isAdminBox(this.bot.botID, this.event.threadID);
                if (!isAdminBox) {
                    this.bot.send(`Bot cần quyền quản trị viên để thực hiện kick!`, this.event.threadID, this.event.messageID);
                    return;
                }
                this.kick(listID);
            }
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
exports.default = Kick;
