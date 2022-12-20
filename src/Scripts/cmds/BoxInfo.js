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
class BoxInfo extends CmdAbstract_1.CmdAbstract {
    constructor(bot, scripts) {
        super(bot, scripts, new Log_1.Log("Box Info"), new Command_1.Config("boxinfo", 0, 10, bot.getOwn, "Xem thông tin nhóm", []));
    }
    run() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.bot.getProcess.getThreadInfo(this.event.threadID);
            const threadSettings = ((_b = (_a = this.db.findThread(this.event.threadID)) === null || _a === void 0 ? void 0 : _a.getSettings) === null || _b === void 0 ? void 0 : _b.getPrefix) || this.bot.getConfig.prefix;
            if (info) {
                const { name, adminIDs, userInfo, messageCount } = info;
                let msg = this.bot.getConfig.getHeader("Box info");
                let boys = 0, girls = 0;
                for (let u of userInfo) {
                    if (u.gender == "MALE") {
                        boys++;
                    }
                    else {
                        girls++;
                    }
                }
                msg += `\n- Tên ${name}\n- ID: ${this.event.threadID}\n- Prefix: ${threadSettings}\n- Số thành viên: ${userInfo.length}\n- Số admin: ${adminIDs.length}\n- Nam: ${boys}\n- Nữ: ${girls}\n- Tổng số tin nhắn: ${messageCount}\n` + this.bot.getConfig.getLine;
                this.bot.send(msg, this.event.threadID, this.event.messageID);
            }
        });
    }
    reply() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    reaction() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    every() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = BoxInfo;
