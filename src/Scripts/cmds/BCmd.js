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
class Bcmd extends CmdAbstract_1.CmdAbstract {
    constructor(bot, s) {
        super(bot, s, new Log_1.Log("Bcmd"), new Command_1.Config("bcmd", 1, 10, bot.getOwn, "Cấm một số lệnh trong nhóm!", []));
    }
    banInGroup() {
        const cmdList = this.args.map((s) => s.toLowerCase());
        const thread = this.db.findThread(this.event.threadID);
        const results = [];
        if (!thread) {
            this.bot.send(`Không tồn tại nhóm này trong database vui lòng thử lại sau!`, this.event.threadID, this.event.messageID);
            return;
        }
        if (cmdList.length) {
            for (let s of cmdList) {
                if (this.scripts.hasCmd(s)) {
                    thread.addcmdBan(s);
                    results.push(s);
                }
            }
            this.db.saveThread();
            this.bot.send(`Đã cấm các lệnh ${results.join(", ")} trong nhóm!`, this.event.threadID, this.event.messageID);
        }
        else {
            this.bot.send(`Lệnh cấm không được để trống!`, this.event.threadID, this.event.messageID);
        }
    }
    banUserInGroup() {
        const listID = Object.keys(this.event.mentions);
        if (!listID.length) {
            this.bot.send(`Vui lòng tag người dùng cần cấm dùng lệnh trong nhóm!`, this.event.threadID);
            return;
        }
        const listCmdBan = this.args.filter((s) => this.scripts.hasCmd(s)).map((s) => s.toLowerCase());
        if (!listCmdBan.length) {
            this.bot.send(`Lệnh cấm không được để trống`, this.event.threadID, this.event.messageID);
            return;
        }
        const thread = this.db.findThread(this.event.threadID);
        if (!thread) {
            this.bot.send(`Không có nhóm này trong database vui lòng thử lại`, this.event.threadID, this.event.messageID);
            return;
        }
        const results = [];
        const memBan = [];
        for (let id of listID) {
            const memeber = thread.findMember(id);
            if (memeber) {
                for (let cmd of listCmdBan) {
                    memeber.addCmdBan(cmd);
                    results.push(cmd);
                    memBan.push(memeber.id);
                }
                this.db.saveThread();
            }
        }
        this.bot.send(`Đã cấm các lệnh ${results.join(", ")}, người dùng: ${memBan.join(", ")}`, this.event.threadID, this.event.messageID);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.event.mentions.length) {
                this.banUserInGroup();
            }
            else {
                this.banInGroup();
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
exports.default = Bcmd;
